import styled from 'styled-components';
import Link from 'next/link';

export const CenteredPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SignPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  & > div {
    width: 50%;
  }
  @media all and (max-width: 768px) {
    & > div {
      width: 100%;
    }
    & > div:first-child {
      display: none;
    }
  }
`;

export const CenteredDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &.colored {
    background-color: ${(props) => props.theme.main};
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }
`;

export const SimpleForm = styled.form`
  & > input {
    display: block;
    font-size: 1.25rem;
    width: 100%;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
  & > label {
    font-weight: bold;
  }
  & > input[type='submit'] {
    border: none;
    background-color: ${(props) => props.theme.main};
    color: #fff;
    padding: 0.5rem;
    &[disabled=''] {
      cursor: not-allowed;
      background-color: ${(props) => props.theme.main}55;
    }
  }
  @media all and (max-width: 768px) {
    & > input:not([type='submit']) {
      font-size: 0.75rem;
    }
  }
`;

export const InfoMsg = styled.p`
  display: block;
  color: ${(props) => props.theme.blue};
`;

export const SuccessMsg = styled.p`
  display: block;
  color: ${(props) => props.theme.success};
`;

export const ErrorMsg = styled.p`
  display: block;
  color: ${(props) => props.theme.error};
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1rem;
`;
