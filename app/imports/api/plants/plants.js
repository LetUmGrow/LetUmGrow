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
    max: 50,
  },
  scientificName: {
    label: 'ScientificName',
    type: String,
    optional: false,
    max: 50,
  },
  decimalLongitude: {
    label: 'DecimalLongitude',
    type: String,
    optional: false,
    max: 50,
  },
  decimalLatitude: {
    label: 'DecimalLatitude',
    type: String,
    optional: false,
    max: 50,
  },
  plDesc: {
    label: 'PlDesc',
    type: String,
    optional: false,
    max: 300,
  },
});

Plants.attachSchema(PlantsSchema);
