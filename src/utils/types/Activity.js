import ActivityImage from './ActivityImage';
import Review from './Review';
import User from './User';
import Material from './Material';

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
reviewList{${Review}}
activityImageList{${ActivityImage}}
averageRating
user{${User}}
materialList{${Material}}
`;
