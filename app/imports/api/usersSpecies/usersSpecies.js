import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const UsersSpecies = new Mongo.Collection('UsersSpecies');

export const UsersSpeciesSchema = new SimpleSchema({
  owner: {
    label: 'OwnerUserId',
    type: String,
    max: 200,
    optional: false,
  },
  speciesId: {
    label: 'SpeciesID',
    type: Number,
    max: 10,
    optional: true,
  },
});

UsersSpecies.attachSchema(UsersSpeciesSchema);