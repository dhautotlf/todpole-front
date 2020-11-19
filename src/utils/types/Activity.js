import ActivityImage from './ActivityImage';

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
`;
