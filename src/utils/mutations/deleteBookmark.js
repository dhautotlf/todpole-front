import gql from 'graphql-tag';
import apiGraph from '../api/apiGraph';

const mutation = gql`
  mutation deleteBookmark($id: Int!) {
    deleteBookmark(id: $id)
  }
`;

export default async (variables) => {
  const response = await apiGraph.mutate({
    mutation,
    variables,
  });
  return response.data.deleteBookmark;
};
