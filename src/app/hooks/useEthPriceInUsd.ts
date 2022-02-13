import { useContext, useEffect, useState } from 'react';
import { appContext } from '../contexts';
import { assoc } from '../../utils/objects';
import { fetchMarketsPriceInUsd } from '../services/api';

export const useEthPriceInUsd = () => {
  const [state, setState] = useState<{
    value: number | null;
    loading: boolean;
  }>({ value: null, loading: true });
  const { jwt } = useContext(appContext);
  const loading = jwt.loading;

  useEffect(() => {
    setState(assoc('loading', true));
    if (jwt.value && !jwt.loading) {
      fetchMarketsPriceInUsd(jwt.value)
        .then(({ data, error }) => {
          if (error && error.logout) {
            // TODO logout
            console.warn(error.message);
          }
          setState(assoc('value', data));
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          setState(assoc('loading', false));
        });
    }
  }, [jwt, loading, setState]);

  return state;
};
