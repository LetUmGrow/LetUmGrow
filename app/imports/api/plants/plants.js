import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Plants = new Mongo.Collection('Plants');

/**
 * Create the schema for Stuff
 */
export const PlantsSchema = new SimpleSchema({
  vernacularName: {
    label: 'VernacularName',
    type: String,
    optional: false,
    max: 20,
    autoform: {
      group: 'Plants',
      placeholder: 'Plant',
    },
  },
  scientificName: {
    label: 'ScientificName',
    type: String,
    optional: false,
  },
  decimalLongitude: {
    label: 'DecimalLongitude',
    type: Number,
    optional: false,
  },
  decimalLatitude: {
    label: 'DecimalLatitude',
    type: Number,
    optional: false,
  },
  plDesc: {
    label: 'PlDesc',
    type: String,
    optional: false,
  },
});

Plants.attachSchema(PlantsSchema);
