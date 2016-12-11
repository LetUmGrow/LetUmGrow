import {UserInfo} from '../../api/userInfo/userInfo.js';
import {_} from 'meteor/underscore';
import {Meteor} from 'meteor/meteor';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */

const userSeeds = [
  { owner: 'xxxx', username: 'WMullen', email: 'wlmullen@hawaii.edu', first: 'Bill', last: 'Mullen', photoUrl: '' },
];

/**
 * Adds the userSeeds to the Users collection if userSeeds does not already exist.
 */

if (UserInfo.find().count() === 0) {
  _.each(userSeeds, function seedUsers(user) {
    UserInfo.insert(user);
  });
}


