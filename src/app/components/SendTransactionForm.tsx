import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { ErrorMsg, InfoMsg, SimpleForm, SuccessMsg } from '../../styles';
import { Div, FormTitle } from '../../styles/sendTransactionFormComponent';
import { renderCurrency } from '../../utils/currencies';
import { assoc } from '../../utils/objects';

const SendTransactionForm: FC<{
  onSubmit: (a: string, v: number) => Promise<string>;
}> = ({ onSubmit }) => {
  const [state, setState] = useState({
    toAddress: '',
    amount: '',
    loading: false,
    successMsg: '',
    errorMsg: '',
  });
  const [amount, setAmount] = useState<number>(Number(state.amount));

  useEffect(() => {
    setAmount(Number(state.amount));
  }, [state.amount]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const {
        currentTarget: { name, value },
      } = e;
      if (name === 'toAddress' || name === 'amount') {
        setState(assoc('errorMsg', ''));
        setState(assoc(name, value));
      }
    },
    [setState],
  );

  return (
    <Div>
      <FormTitle>Send ETH</FormTitle>
      <SimpleForm
        onSubmit={async (e) => {
          e.preventDefault();
          if (state.toAddress && amount) {
            setState(assoc('loading', true));
            setState(assoc('successMsg', ''));
            const message = await onSubmit(state.toAddress, amount);
            if (message) setState(assoc('errorMsg', message));
            else {
              setState(
                assoc('successMsg', `You've successfully sent ${amount} ETH`),
              );
              setState(assoc('toAddress', ''));
              setState(assoc('amount', ''));
            }
            setState(assoc('loading', false));
          }
        }}
      >
        <label htmlFor="send-transaction-form-to-address">To Address:</label>
        <input
          id="send-transaction-form-to-address"
          required
          name="toAddress"
          value={state.toAddress}
          onChange={onChange}
        />
        <label htmlFor="send-transaction-form-amount">Amount:</label>
        <input
          id="send-transaction-form-amount"
          required
          type="number"
          name="amount"
          value={state.amount}
          onChange={onChange}
        />
        <input
          type="submit"
          value={state.loading ? 'Sending...' : 'Send'}
          disabled={state.loading || !state.toAddress || !amount || amount < 0}
        />
      </SimpleForm>
      {state.loading && !state.successMsg && !state.errorMsg && (
        <InfoMsg>This might take a while...</InfoMsg>
      )}
      {!state.loading && state.successMsg && !state.errorMsg && (
        <SuccessMsg>{state.successMsg}</SuccessMsg>
      )}
      {!state.loading && !state.successMsg && state.errorMsg && (
        <ErrorMsg>{state.errorMsg}</ErrorMsg>
      )}
    </Div>
  );
};

export default SendTransactionForm;
