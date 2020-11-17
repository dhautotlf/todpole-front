import ActivityImage from './ActivityImage';

export default `
userId
category
name
ageMin
ageMax
timingMin
timingMax
description
url
activityImageList{${ActivityImage}}
`;
