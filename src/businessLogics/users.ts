import {
  InsufficientBalanceError,
  UsernameAlreadyExistsError,
  UserNotFoundError,
} from '../errors';
import { getEtherPriceInUsd } from '../services/binance';
import {
  blockchainAccounts,
  blockchainTransactions,
} from '../services/blockchain';
import {
  DEFAULT_GAS,
  getGasPrice,
  toWei,
} from '../services/blockchain/commons';
import {
  decryptString,
  encryptString,
  hashString,
} from '../services/cryptography';
import { usersDb } from '../services/database';
import { jwtSign, jwtVerify } from '../services/jwt';
import { User } from '../types';

export async function createUserInDb(
  username: string,
  password: string,
): Promise<User> {
  if (await isUsernameInDb(username)) throw new UsernameAlreadyExistsError();
  const passwordHash = hashString(password);
  const bcAccount = await blockchainAccounts.createAccount();
  const dbUser = await usersDb.insertUser(
    username,
    hashString(password),
    bcAccount.address,
    encryptString(bcAccount.privateKey),
  );
  const balance = await blockchainAccounts.getAccountBalance(bcAccount.address);
  return {
    _id: dbUser.insertedId.toHexString(),
    username,
    passwordHash,
    balance,
    ...bcAccount,
  };
}

export async function fetchUserByUsernameFromDb(
  username: string,
): Promise<User | null> {
  const dbUser = await usersDb.findUserByUsername(username);
  if (dbUser === null) return null;
  const { _id, passwordHash, privateKeyHash } = dbUser;
  const privateKey = decryptString(privateKeyHash);
  const bcAccount = await blockchainAccounts.getAccountByPrivateKey(privateKey);
  const balance = await blockchainAccounts.getAccountBalance(bcAccount.address);
  return {
    _id: _id.toHexString(),
    username,
    passwordHash,
    balance,
    ...bcAccount,
  };
}

export async function sendTransaction(
  user: User,
  toAddress: string,
  amount: number,
): Promise<User> {
  const gas = DEFAULT_GAS;
  const [gasPrice, balance] = await Promise.all([
    getGasPrice(),
    blockchainAccounts.getAccountBalance(user.address),
  ]);
  if (amount > gas * gasPrice + balance) throw new InsufficientBalanceError();
  await blockchainTransactions.sendTransaction(user, toAddress, amount, gas);
  const newBalance = await blockchainAccounts.getAccountBalance(user.address);
  return { ...user, balance: newBalance };
}

export function generateUserJwt(user: User): string {
  const { _id, username } = user;
  return jwtSign({ _id, username });
}

export async function getUserFromJwt(jwt: string): Promise<User> {
  const jwtUser = jwtVerify(jwt);
  const maybeUser = await fetchUserByUsernameFromDb(jwtUser.username);
  if (maybeUser === null) throw new UserNotFoundError();
  return maybeUser;
}

async function isUsernameInDb(username: string) {
  return (await fetchUserByUsernameFromDb(username)) !== null;
}
