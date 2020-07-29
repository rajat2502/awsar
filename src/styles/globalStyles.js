import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: proximaNova;
    src: url(./assets/fonts/ProximaNovaRegular.ttf);
  }

  body {
    top: 0 !important;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
    font-family: proximaNova, sans-serif;
  }

  .App {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ececec;
  }

  button {
    &:focus {
      outline: none;
    }
  }

  .loader {
    width: 110px;
    margin:auto;
  }
`;
