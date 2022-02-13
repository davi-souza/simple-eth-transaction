import { User } from '../../types';
import { DEFAULT_GAS, eth, toWei } from './commons';

export async function sendTransaction(
  fromUser: User,
  toAddress: string,
  amount: number,
  gas: number = DEFAULT_GAS,
) {
  const signedTx = await fromUser.signTransaction({
    to: toAddress,
    value: toWei(String(amount), 'ether'),
    gas,
  });
  // Note: rawTransaction is going to exist
  await eth.sendSignedTransaction(signedTx.rawTransaction ?? '');
}
