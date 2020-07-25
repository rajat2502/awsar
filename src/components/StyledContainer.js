import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledContainer = styled.div.attrs({
  className: 'container mx-auto my-4 px-2',
})`
  div {
    &.cards-grid {
      ${tw`flex flex-wrap mx-2`}

      .left-card {
        ${tw`w-full my-4 sm:my-0 sm:w-1/3 sm:px-2`}
      }

      .right-card {
        ${tw`w-full my-4 sm:my-0 sm:w-2/3 sm:px-2`}
      }

      .grid-card {
        ${tw`shadow rounded bg-white py-4 px-6`}
      }

      .job {
        ${tw`cursor-pointer border border-l-4 border-blue-600 px-4 py-2 text-sm mb-4 hover:shadow-md`}

        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;

        .job-main {
          ${tw`text-lg`}

          .title {
            ${tw`font-bold`}
          }
        }

        .job-desc {
          ${tw`mt-2 text-gray-600`}
        }
      }
    }
  }

  h1 {
    ${tw`text-3xl font-bold text-center m-2 text-blue-700`}
  }

  button {
    ${tw`my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in duration-200`}

    &:disabled {
      ${tw`hover:bg-blue-500 opacity-50 cursor-not-allowed`}
    }
  }
`;
