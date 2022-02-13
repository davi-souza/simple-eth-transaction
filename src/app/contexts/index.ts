import { createContext } from 'react';
import { AppContext } from '../../types';

export const appContext = createContext<AppContext>({
  user: { value: null, loading: false },
  jwt: { value: null, loading: true },
  signOut: () => {},
  signIn: () => {},
  updateUser: () => {},
});
