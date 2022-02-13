import { FC } from 'react';
import {
  Container,
  LogoutButton,
  UserDiv,
  UserBalance,
  UserInfo,
} from '../../styles/appBarComponent';
import { AppUser } from '../../types';
import { renderCurrency } from '../../utils/currencies';

const AppBar: FC<{
  user: AppUser | null;
  ethPriceInUsd: { value: number | null; loading: boolean };
  onSignOut: () => void;
}> = ({ user, ethPriceInUsd, onSignOut }) => {
  const { value, loading } = ethPriceInUsd;

  return (
    <Container>
      <span id="appbar-title">ETP by Davi</span>
      {user !== null && (
        <UserDiv>
          <UserInfo>{user.username}</UserInfo>
          <UserBalance>
            <span id="appbar-user-eth-balance">
              {renderCurrency(user.balance)} ETH
            </span>
            <span className="spacer">-</span>
            <span id="appbar-user-dollar-balance">
              {loading === true
                ? 'calculating...'
                : value === null
                ? null
                : renderCurrency(user.balance * value) + ' USD'}{' '}
            </span>
          </UserBalance>
          <LogoutButton id="appbar-logout" onClick={onSignOut}>
            Log Out
          </LogoutButton>
        </UserDiv>
      )}
    </Container>
  );
};

export default AppBar;
