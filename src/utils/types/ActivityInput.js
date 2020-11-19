import ActivityImage from './ActivityImage';

export default `
userId
category
name
ageMin
ageMax
timing
description
url
activityImageList{${ActivityImage}}
`;
