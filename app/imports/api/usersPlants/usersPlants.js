import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const UsersPlants = new Mongo.Collection('UsersPlants');

export const UsersPlantsSchema = new SimpleSchema({
  owner: {
    label: 'OwnerUserId',
    type: String,
    max: 200,
    optional: false,
  },
  plantId: {
    label: 'plantId',
    type: String,
    max: 200,
    optional: false,
  },
});

UsersPlants.attachSchema(UsersPlantsSchema);