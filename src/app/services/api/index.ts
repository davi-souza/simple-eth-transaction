import { AppUser, FetchResult } from '../../../types';

const BASE_URL = '/api';
const API_FUNCTIONS = {
  signIn: 'users/login',
  signUp: 'users',
  sendTransaction: 'users/transactions',
  getUserInfo: 'users',
  getEthPriceInUsd: 'markets/usd',
};

export async function fetchUserInfo(
  jwt: string,
): Promise<FetchResult<AppUser>> {
  const path = API_FUNCTIONS.getUserInfo;
  const res = await privateFetch(jwt, `${BASE_URL}/${path}`);
  const response = await res.json();
  if (!res.ok) {
    return handleNotOk(response, res.status);
  }
  return {
    data: response.data,
    error: null,
  };
}

export async function signIn(
  username: string,
  password: string,
): Promise<FetchResult<{ user: AppUser; jwt: string }>> {
  const path = API_FUNCTIONS.signIn;
  const res = await fetch(`${BASE_URL}/${path}`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const response = await res.json();
  if (!res.ok) {
    return handleNotOk(response, res.status);
  }
  return {
    data: response.data,
    error: null,
  };
}

export async function signUp(
  username: string,
  password: string,
): Promise<FetchResult<{ user: AppUser; jwt: string }>> {
  const path = API_FUNCTIONS.signUp;
  const res = await fetch(`${BASE_URL}/${path}`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const response = await res.json();
  if (!res.ok) {
    return handleNotOk(response, res.status);
  }
  return {
    data: response.data,
    error: null,
  };
}

export async function fetchMarketsPriceInUsd(
  jwt: string,
): Promise<FetchResult<number>> {
  const path = API_FUNCTIONS.getEthPriceInUsd;
  const res = await privateFetch(jwt, `${BASE_URL}/${path}`);
  const response = await res.json();
  if (!res.ok) {
    return handleNotOk(response, res.status);
  }
  return {
    data: response.data,
    error: null,
  };
}

export async function sendTransaction(
  jwt: string,
  toAddress: string,
  amount: number,
): Promise<FetchResult<AppUser>> {
  const path = API_FUNCTIONS.sendTransaction;
  const res = await privateFetch(jwt, `${BASE_URL}/${path}`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ toAddress, amount }),
  });
  const response = await res.json();
  if (!res.ok) {
    return handleNotOk(response, res.status);
  }
  return {
    data: response.data,
    error: null,
  };
}

async function privateFetch(jwt: string, ...args: Parameters<typeof fetch>) {
  const [input, init] = args;
  const newInit: typeof init = {
    ...init,
    headers: {
      ...init?.headers,
      authorization: `Bearer ${jwt}`,
    },
  };
  return await fetch(input, newInit);
}

function handleNotOk<T>(
  responseBody: { error: { message: string } },
  status: number,
): FetchResult<T> {
  return {
    data: null,
    error: {
      message: responseBody.error.message,
      logout: status === 401,
    },
  };
}
