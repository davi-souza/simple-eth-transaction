import { dbConfig } from '../../config';
import { run } from './commons';

export async function insertUser(
  username: string,
  passwordHash: string,
  address: string,
  privateKeyHash: string,
) {
  return await run(async (db) => {
    const user = await db
      .collection(dbConfig.collections.users)
      .insertOne({ username, passwordHash, address, privateKeyHash });
    return user;
  });
}

export async function findUserByUsername(username: string) {
  return await run(async (db) => {
    const user = await db
      .collection(dbConfig.collections.users)
      .findOne({ username });
    return user;
  });
}
