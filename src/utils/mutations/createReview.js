import gql from 'graphql-tag';
import apiGraph from '../api/apiGraph';
import type from '../types';

const mutation = gql`
  mutation createReview(
    $activityId: Int!,
    $rating: Int!,
    $text: String
  ) {
    createReview(reviewInput: {
      activityId: $activityId
      rating: $rating
      text: $text
    }) {
      ${type.Review}
    }
  }
`;

export default async (variables) => {
  const response = await apiGraph.mutate({
    mutation,
    variables,
  });
  return response.data.createReview;
};
