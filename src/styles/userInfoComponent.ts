import styled from 'styled-components';

export const LoadingDiv = styled.div`
  height: 5rem;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Div = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  & #user-username {
    font-weight: bold;
  }
  & #user-address-qrcode {
    height: 12rem;
    width: auto;
  }
  & #user-address-text {
    font-size: 0.75rem;
    text-align: center;
    & > button {
      display: block;
      border: none;
      background-color: ${(props) => props.theme.main};
      color: #fff;
      font-size: 0.75rem;
      font-weight: bold;
      padding: 0.25rem 0.5rem;
      cursor: pointer;
      margin: 0.25rem auto 0;
      &:active {
        -webkit-box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
        box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
      }
    }
  }
`;
