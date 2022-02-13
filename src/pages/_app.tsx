import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { fetchUserInfo } from '../app/services/api';
import { appContext } from '../app/contexts';
import { CenteredPage } from '../styles';
import { GlobalStyle } from '../styles/globals';
import { AppContext } from '../types';
import { assoc, assocUpdate } from '../utils/objects';

function MyApp({ Component, pageProps }: AppProps) {
  const [state, setState] = useState<Pick<AppContext, 'user' | 'jwt'>>({
    user: { value: null, loading: false },
    jwt: { value: null, loading: true },
  });
  const { route, replace } = useRouter();

  useEffect(() => {
    setState(assocUpdate('jwt', { loading: true }));
    const jwt = window.localStorage.getItem('jwt');
    setState(assocUpdate('jwt', { loading: false, value: jwt }));
  }, [setState]);

  useEffect(() => {
    if (!state.jwt.loading && state.jwt.value === null && !['/signin', '/signup'].includes(route)) {
      replace('/signin');
    }
  }, [state.jwt.loading, state.jwt.value, route, replace]);

  useEffect(() => {
    if (!state.jwt.loading && state.jwt.value !== null) {
      setState(assocUpdate('user', { loading: true }));
      fetchUserInfo(state.jwt.value)
        .then(({ data, error }) => {
          if (error && error.logout) {
            console.warn(error.message);
            setState(assocUpdate('jwt', { value: null }));
          }
          setState(assocUpdate('user', { value: data }));
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          setState(assocUpdate('user', { loading: false }));
        });
    }
  }, [state.jwt.loading, state.jwt.value, setState]);

  const signOut = useCallback<AppContext['signOut']>(() => {
    window.localStorage.removeItem('jwt');
    setState({
      user: { value: null, loading: false },
      jwt: { value: null, loading: false },
    });
  }, [setState]);

  const signIn = useCallback<AppContext['signIn']>(
    (user, jwt) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('jwt', jwt);
      }
      if (route !== '/') replace('/');
      setState({
        user: { value: user, loading: false },
        jwt: { value: jwt, loading: false },
      });
    },
    [route, setState, replace],
  );

  const updateUser = useCallback<AppContext['updateUser']>(
    (user) => {
      setState(assocUpdate('user', { value: user }));
    },
    [setState],
  );

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/plus-jakarta-display.min.css"
        />
      </Head>
      <ThemeProvider
        theme={{
          main: '#07B966',
          success: '#07B966',
          error: '#E5625E',
          blue: '#08A4BD',
        }}
      >
        <GlobalStyle />
        {state.jwt.loading || state.user.loading ? (
          <CenteredPage>
            <p>Loading...</p>
          </CenteredPage>
        ) : (
          <appContext.Provider
            value={{
              ...state,
              signOut,
              signIn,
              updateUser,
            }}
          >
            <Component {...pageProps} />
          </appContext.Provider>
        )}
      </ThemeProvider>
    </>
  );
}

export default MyApp;
