import { eth, fromWei } from './commons';

export async function createAccount() {
  return eth.accounts.create();
}

export async function getAccountByPrivateKey(privateKey: string) {
  return eth.accounts.privateKeyToAccount(privateKey);
}

export async function getAccountBalance(address: string) {
  return Number(fromWei(await eth.getBalance(address), 'ether'));
}
