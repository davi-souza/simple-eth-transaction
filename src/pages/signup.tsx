import type { NextPage } from 'next';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { signUp } from '../app/services/api';
import { appContext } from '../app/contexts';
import {
  CenteredDiv,
  ErrorMsg,
  SignPageContainer,
  SimpleForm,
} from '../styles';
import { assoc } from '../utils/objects';

const SignInPage: NextPage = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    loading: false,
  });
  const [errorMsg, setErrorMsg] = useState('');
  const { signIn: ctxSignIn } = useContext(appContext);

  return (
    <SignPageContainer>
      <CenteredDiv className="colored">
        <p>
          Simple ETH transactions
          <br />
          project
        </p>
      </CenteredDiv>
      <CenteredDiv>
        <div>
          <h2>Create an account</h2>
          <SimpleForm
            onSubmit={(e) => {
              e.preventDefault();
              if (!state.username || !state.password) return;
              setErrorMsg('');
              setState(assoc('loading', true));
              signUp(state.username, state.password)
                .then((res) => {
                  if (res.data) {
                    return ctxSignIn(res.data.user, res.data.jwt);
                  }
                  setErrorMsg(res.error.message);
                })
                .finally(() => {
                  setState(assoc('loading', false));
                });
            }}
          >
            <label htmlFor="signin-form-username">Username</label>
            <input
              id="signin-form-username"
              value={state.username}
              onChange={(e) => {
                setState(assoc('username', e.currentTarget.value));
              }}
            />
            <label htmlFor="signin-form-password">Password</label>
            <input
              id="signin-form-password"
              type="password"
              value={state.password}
              onChange={(e) => {
                setState(assoc('password', e.currentTarget.value));
              }}
            />
            <input
              type="submit"
              value={state.loading ? 'Loading...' : 'Sign Up'}
              disabled={state.loading}
            />
          </SimpleForm>
          <Link href="/signin">
            <a>Already have an account? Click here to sign in</a>
          </Link>
          {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        </div>
      </CenteredDiv>
    </SignPageContainer>
  );
};

export default SignInPage;
