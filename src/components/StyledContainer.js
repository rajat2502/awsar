import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledContainer = styled.div.attrs({
  className: 'container mx-auto my-6 px-2',
})`
  div {
    &.cards-grid {
      ${tw`flex flex-wrap mx-2`}

      .left-card {
        ${tw`w-full my-4 sm:my-0 sm:w-1/4 sm:px-4`}
      }

      .right-card {
        ${tw`w-full my-4 sm:my-0 sm:w-3/4 sm:px-2`}
      }

      .grid-card {
        ${tw`shadow rounded bg-white py-4 px-6`}
      }

      .job {
        ${tw`relative cursor-pointer border border-blue-600 px-4 py-2 text-sm mb-4 hover:shadow-md`}

        border-left-width: 6px;
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;

        &.women-job {
          ${tw`border-pink-500`}
        }

        &.disabled-job {
          ${tw`border-green-600`}
        }

        .job-main {
          ${tw`text-base`}

          .title {
            ${tw`font-bold`}
          }
        }

        .job-desc {
          ${tw`mt-1 mb-1 text-gray-600`}
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

    &.apply-button {
      @media (min-width: 640px) {
        top: 4px;
        right: 10px;
      }
    }

    &.clear-filters {
      ${tw`py-1 text-white font-medium bg-gray-700 border border-gray-400`}
    }
  }

  select {
    ${tw`my-1 w-full block bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-2 border-gray-400`}
  }
`;
