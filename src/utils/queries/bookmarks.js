import gql from 'graphql-tag';
import apiGraph from '../api/apiGraph';
import type from '../types';

const query = gql`
  query {
    myBookmarks {
      ${type.Bookmark}
    }
  }
`;

export default async () => {
  const response = await apiGraph.query({
    query,
  });
  return response.data.myBookmarks;
};
