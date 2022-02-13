import styled from 'styled-components';
import { Container as CommonContainer } from './index';

export const Container = styled(CommonContainer)`
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  color: #000;
  & #appbar-title {
    color: ${(props) => props.theme.main};
    font-size: 1.25rem;
    font-weight: bold;
  }
  @media all and (max-width: 768px) {
    & #appbar-title {
      font-size: 1rem;
    }
  }
`;

export const UserDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const UserInfo = styled.div`
  margin-right: 1.25rem;
  font-weight: bold;
  @media all and (max-width: 768px) {
    display: none;
  }
`;

export const UserBalance = styled.div`
  font-size: 1rem;
  & .spacer {
    margin: 0 0.5rem;
  }
  @media all and (max-width: 768px) {
    font-size: 0.75rem;
    & .spacer {
      margin: 0 0.25rem;
    }
  }
`;

export const LogoutButton = styled.button`
  padding: 1rem;
  margin-left: 1rem;
  border: none;
  background-color: inherit;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.main}33;
  }
  @media all and (max-width: 768px) {
    font-size: 0.75rem;
  }
`;
