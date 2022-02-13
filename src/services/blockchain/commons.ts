import Web3 from 'web3';
import { blockchainConfig } from '../../config';

export const web3 = new Web3(
  new Web3.providers.WebsocketProvider(blockchainConfig.wssAddress),
);

export const {
  eth,
  utils: { fromWei, toWei },
} = web3;

export const DEFAULT_GAS = 21000;

export async function getGasPrice() {
  return Number(fromWei(await eth.getGasPrice(), 'ether'));
}
