import gql from 'graphql-tag';
import apiGraph from '../api/apiGraph';

const query = gql`
  query {
    current {
      id
    }
  }
`;

export default async () => {
  const response = await apiGraph.query({
    query,
  });
  return response.data.current;
};
