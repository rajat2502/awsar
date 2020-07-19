import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledForm = styled.main.attrs({
  className:
    'shadow-md rounded-lg py-12 bg-white m-auto flex justify-center flex-col items-center',
})`
  & {
    width: ${({ width }) => width};

    h1 {
      ${tw`text-3xl font-bold text-center m-2 text-blue-600`}
    }

    form {
      ${tw`flex flex-col justify-center`}
    }

    input {
      ${tw`focus:outline-none focus:shadow-outline m-1 block border border-gray-300 rounded py-2 px-4 appearance-none leading-normal border-gray-400`}
    }

    button {
      ${tw`my-2 mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded`}

      &:disabled {
        ${tw`hover:bg-blue-500 opacity-50 cursor-not-allowed`}
      }

      &.selected {
        ${tw`bg-white text-blue-500 border border-blue-500`}
      }
    }

    a {
      ${tw`text-blue-400 font-bold`}
    }
  }
`;
