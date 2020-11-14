import gql from 'graphql-tag';
import apiGraph from '../api/apiGraph';

const mutation = gql`
  mutation login($login: String!, $password: String!) {
    login(login: $login, password: $password)
  }
`;

export default async (variables) => {
  const response = await apiGraph.mutate({
    mutation,
    variables,
  });
  return response.data.login;
};
