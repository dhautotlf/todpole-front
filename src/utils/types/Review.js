import User from './User';

export default `
id
userId
activityId
rating
text
user{${User}}
`;
