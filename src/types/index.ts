import { ObjectId } from 'mongodb';
import { Account } from 'web3-core/types';

export type AppContext = Readonly<{
  user: { value: AppUser | null; loading: boolean };
  jwt: { value: string | null; loading: boolean };
  signOut: () => void;
  signIn: (user: AppUser, jwt: string) => void;
  updateUser: (user: AppUser) => void;
}>;

export type DbUser = Readonly<{
  _id: ObjectId;
  username: string;
  passwordHash: string;
  address: string;
  privateKeyHash: string;
}>;

export type User = Account &
  Readonly<{
    _id: string;
    username: string;
    passwordHash: string;
    balance: number;
  }>;

export type JwtUser = Readonly<{
  _id: string;
  username: string;
}>;

export type AppUser = Readonly<{
  _id: string;
  username: string;
  address: string;
  balance: number;
}>;

export type FetchResult<T> =
  | Readonly<{
      data: T;
      error: null;
    }>
  | Readonly<{
      data: null;
      error: Readonly<{
        message: string;
        logout: boolean;
      }>;
    }>;
