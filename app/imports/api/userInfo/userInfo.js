import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const UserInfo = new Mongo.Collection('UserInfo');

export const UsersSchema = new SimpleSchema({
  owner: {
    label: 'OwnerUserId',
    type: String,
    max: 200,
    optional: false,
  },
  username: {
    label: 'username',
    type: String,
    max: 200,
    optional: false,
  },
  email: {
    label: 'email',
    type: String,
    max: 200,
    optional: false,
  },
  first: {
    label: 'first',
    type: String,
    max: 200,
    optional: true,
  },
  last: {
    label: 'last',
    type: String,
    max: 200,
    optional: true,
  },
  photoUrl: {
    label: 'photo url',
    type: String,
    max: 200,
    optional: true,
  },
});

UserInfo.attachSchema(UsersSchema);