import gql from 'graphql-tag';
import apiGraph from '../api/apiGraph';
import type from '../types';

const query = gql`
query activity($id: Int!) {
  activity(id: $id){
    ${type.Activity}
  }
}
`;

export default async (variables) => {
  const response = await apiGraph.query({
    query,
    variables,
  });
  return response.data.activity;
};
