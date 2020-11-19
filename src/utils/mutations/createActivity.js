import gql from 'graphql-tag';
import apiGraph from '../api/apiGraph';

const mutation = gql`
  mutation createNewActivity(
    $category: ActivityCategory!,
    $activityImageList: [ActivityImageInput],
    $name:String!,
    $ageMin:Int!,
    $ageMax:Int!,
    $timing:Int!,
    $description:String!,
    $url:String!
  ) {
    createActivity(activityInput: {
      category: $category
      name: $name
      ageMin: $ageMin
      ageMax: $ageMax
      timing: $timing
      description: $description
      url: $url
      activityImageList: $activityImageList
    }) {
      id
      name
      ageMin
      description
      url
      ageMax
      timing
      userId
      activityImageList {
        url
        isMain
      }
    }
  }
`;

export default async (variables) => {
  const response = await apiGraph.mutate({
    mutation,
    variables,
  });
  return response.data.createActivity;
};
