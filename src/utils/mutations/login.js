import gql from 'graphql-tag';

export default gql`
  mutation register($login: String!, $password: String!) {
    register(login: $login, password: $password) {
      String
    }
  }
`;
