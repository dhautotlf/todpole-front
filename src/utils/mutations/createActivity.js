import gql from 'graphql-tag';
import apiGraph from '../api/apiGraph';
import type from '../types';

const mutation = gql`
  mutation createNewActivity(
    $category: ActivityCategory!,
    $activityImageList: [ActivityImageInput],
    $name:String!,
    $ageMin:Int!,
    $ageMax:Int!,
    $timing:Int!,
    $description:String!,
    $url:String!,
    $review: ReviewInput2,
    $materialList: [MaterialInput],
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
      review: $review
      materialList: $materialList
    }) {
      ${type.Activity}
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
