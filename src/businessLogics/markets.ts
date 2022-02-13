import { getEtherPriceInUsd } from '../services/binance';

export async function getPriceInUsd() {
  return await getEtherPriceInUsd();
}
