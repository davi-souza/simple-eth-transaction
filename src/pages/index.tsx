import type { NextPage } from 'next';
import { useCallback, useContext, useMemo } from 'react';
import AppBar from '../app/components/AppBar';
import { useEthPriceInUsd } from '../app/hooks/useEthPriceInUsd';
import { appContext } from '../app/contexts';
import { Container } from '../styles';
import UserInfo from '../app/components/UserInfo';
import SendTransactionForm from '../app/components/SendTransactionForm';
import { sendTransaction } from '../app/services/api';

const Home: NextPage = () => {
  const {
    user: { value: user, loading: userLoading },
    jwt: { value: jwt, loading: jwtLoading },
    signOut,
    updateUser,
  } = useContext(appContext);

  const loading = useMemo(
    () => userLoading || jwtLoading,
    [userLoading, jwtLoading],
  );

  const ethPriceInUsd = useEthPriceInUsd();

  const onSendTransaction = useCallback(
    async (toAddress: string, amount: number): Promise<string> => {
      if (!loading && jwt) {
        const { data, error } = await sendTransaction(jwt, toAddress, amount);
        if (error) {
          if (error.logout) signOut();
          return error.message;
        } else if (data) {
          updateUser(data);
        }
      }
      return '';
    },
    [loading, jwt, signOut, updateUser],
  );

  return (
    <>
      <AppBar user={user} ethPriceInUsd={ethPriceInUsd} onSignOut={signOut} />
      <Container>
        <UserInfo user={user} loading={loading} />
        <SendTransactionForm onSubmit={onSendTransaction} />
      </Container>
    </>
  );
};

export default Home;
