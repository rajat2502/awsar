import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    top: 0 !important;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  .App {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ececec;
  }
`;
