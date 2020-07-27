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

    &.women-job {
      ${tw`bg-white mt-2 mr-2 rounded-sm text-white px-1 py-0 text-pink-600 border border-pink-600`}
    }

    &.disabled-job {
      ${tw`bg-white mt-2 rounded-sm text-white px-1 py-0 text-green-600 border border-green-600`}
    }

    &.general {
      ${tw`bg-white mt-2 rounded-sm text-white px-1 py-0 text-blue-600 border border-blue-600`}
    }

    &.clear-filters {
      ${tw`py-1 text-white font-medium bg-gray-700 border border-gray-400 rounded-full`}
    }
  }

  select {
    ${tw`my-1 w-full block bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-2 border-gray-400`}
  }

  table {
    ${tw`rounded shadow-lg w-full table-auto`}

    th,
    td {
      ${tw`text-center px-4 py-4`}

      a {
        ${tw`text-blue-600 hover:underline`}
      }
    }

    td {
      ${tw`text-gray-700`}

      span {
        &.status {
          ${tw`cursor-pointer text-sm font-bold py-1 px-4 rounded-full`}

          .change-status {
            z-index: 1;
            transform: scale(0.8);
            transition: all 0.25s;
            opacity: 0;

            li {
              ${tw`my-1 cursor-pointer font-medium text-gray-700 hover:text-blue-600`}
            }
          }

          &:hover {
            .change-status {
              opacity: 1;
              transform: scale(1);
            }
          }
        }

        &.Applied {
          ${tw`text-blue-700 bg-blue-300`}
        }
      }
    }

    thead {
      ${tw`text-white bg-gray-700 shadow`}
    }

    tbody {
      ${tw`bg-white`}
    }
  }
`;
