import gql from 'graphql-tag';

export default gql`
  mutation login($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      String
    }
  }
`;
