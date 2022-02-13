import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    font-family: 'Plus Jakarta Display', sans-serif;
    box-sizing: border-box;
  }
`;
