import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Plants = new Mongo.Collection('Plants');

/**
 * Create the schema for Plants
 * only the geolocation coordinates for latitude and longitude are required for now
 */
export const PlantsSchema = new SimpleSchema({
  vernacularName: { //the common name of the plant
    label: 'VernacularName',
    type: String,
    optional: true,
    max: 50,
  },
  scientificName: {
    label: 'ScientificName',
    type: String,
    optional: true,
    max: 50,
  },
  decimalLatitude: { //latitude coordinate of the plant used for geolocation; may add this to a coordinates object in the future
    label: 'DecimalLatitude',
    type: Number,
    decimal: true,
    optional: false,
    max: 90, //limit to manoa by min and max?
  },
  decimalLongitude: { //longitude coordinate of the plant used for geolocation; may add this to a coordinates object in the future
    label: 'DecimalLongitude',
    type: Number,
    decimal: true,
    optional: false,
    max: 180, //limit to manoa by min and max?
  },
  plDesc: { //the description of the plant
    label: 'PlDesc',
    type: String,
    optional: true,
    max: 300,
  },
  addedBy: {
    label: 'AddedBy',
    type: String,
    optional: false,
    max: 50,
  }
});

Plants.attachSchema(PlantsSchema);
