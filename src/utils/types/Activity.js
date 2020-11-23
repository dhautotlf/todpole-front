import ActivityImage from './ActivityImage';
import Review from './Review';

export default `
id
userId
category
name
ageMin
ageMax
timing
description
url
activityImageList{${ActivityImage}}
averageRating
reviewList{${Review}}
`;
