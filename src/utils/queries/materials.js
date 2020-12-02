import gql from 'graphql-tag';
import apiGraph from '../api/apiGraph';
import type from '../types';

const query = gql`
query searchMaterials($name: String) {
  searchMaterials(name: $name){
    ${type.Material}
  }
}
`;

export default async (variables) => {
  const response = await apiGraph.query({
    query,
    variables,
  });
  return response.data.searchMaterials;
};
