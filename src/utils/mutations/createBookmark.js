import gql from 'graphql-tag';
import apiGraph from '../api/apiGraph';
import type from '../types';
//
// const mutation = gql`
//   mutation createBookmark(
//     activityId: $activityId!,
//   ) {
//     createBookmark($bookmarkInput: {${type.BookmarkInput} }) {
//       ${type.Bookmark}
//     }
//   }
// `;

const mutation = gql`
  mutation createBookmark(
    $activityId: Int!,
  ) {
    createBookmark(bookmarkInput: {
      activityId: $activityId
    }) {
      ${type.Bookmark}
    }
  }
`;

export default async (variables) => {
  const response = await apiGraph.mutate({
    mutation,
    variables,
  });
  return response.data.createBookmark;
};
