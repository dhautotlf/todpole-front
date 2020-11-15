import ActivityImage from './ActivityImage';

export default `
id
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
