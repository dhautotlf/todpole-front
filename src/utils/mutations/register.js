import gql from 'graphql-tag';
import apiGraph from '../api/apiGraph';

const mutation = gql`
  mutation register(
    $login: String!
    $password: String!
    $photo: String
    $name: String
    $birthDate: String
    $gender: Gender
    $toddlerList: [UserInput]
  ) {
    register(
      login: $login
      password: $password
      photo: $photo
      birthDate: $birthDate
      gender: $gender
      name: $name
      toddlerList: $toddlerList
    )
  }
`;

export default async (variables) => {
  try{
    const response = await apiGraph.mutate({
      mutation,
      variables,
    });
    return response.data.register;
  } catch(e) {
    console.log(e)
    throw e;
  }
  
};
