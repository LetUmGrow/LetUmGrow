import {UserInfo} from '../../api/userInfo/userInfo.js';
import {_} from 'meteor/underscore';
import {Meteor} from 'meteor/meteor';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */

let usernameCurrent = 'default';
let userIdCurrent = 'dafault';

const owner = this.userId;

const selfSeed = [
  { owner: userIdCurrent, username: usernameCurrent, email: `${usernameCurrent}@hawaii.edu`, first: 'Eponymous', last: 'User', photoUrl: '' },
];

const userSeeds = [
  { owner: 'xxxx', username: 'MSchultz', email: 'mschultz@hawaii.edu', first: 'Matt', last: 'Schultz', photoUrl: '' },
  { owner: 'XMQ24v3kaGAZHHW94', username: 'wlmullen', email: 'wlmullen@hawaii.edu', first: 'Bill', last: 'Mullen', photoUrl: '' },
];

/**
 * Adds the current user to the Users collection if current user does not already exist.
 */

if (UserInfo.find().count() === 0) {
  _.each(userSeeds, function seedUsers(user) {
    UserInfo.insert(user);
  });
}
/*
function findSelf(data){
  let self = _.filter(data, function (row){return row['owner'] === userIdCurrent });
  return self;
}
*/

let Self = UserInfo.find({ owner });

if (Self.length === 0) {
  _.each(selfSeed, function seedUsers(user) {
    UserInfo.insert(user);
  });
}
