import gql from 'graphql-tag';
import apiGraph from '../api/apiGraph';
import type from '../types';

const query = gql`
  query {
    activities {
      ${type.Activity}
    }
  }
`;

export default async () => {
  const response = await apiGraph.query({
    query,
  });
  return response.data.activities;
};
