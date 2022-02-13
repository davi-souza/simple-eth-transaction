import { Db, MongoClient } from 'mongodb';
import { dbConfig } from '../../config';

let client: MongoClient | null = null;

export async function getClient() {
  if (client === null) {
    const tempClient = new MongoClient(dbConfig.url);
    try {
      await tempClient.connect();
      client = tempClient;
    } catch (error) {
      console.error('Unable to connect mongodb client');
      throw error;
    }
  }
  return client;
}

export async function closeClient() {
  if (client !== null) {
    try {
      await client.close();
      client = null;
    } catch (error) {
      console.error('Unable to close mongodb client');
      throw error;
    }
  }
}

export async function getDb() {
  const client = await getClient();
  return client.db(dbConfig.dbName);
}

export async function run<O>(fn: (db: Db) => Promise<O>) {
  const db = await getDb();
  return await fn(db);
}
