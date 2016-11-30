import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Plants = new Mongo.Collection('Plants');

// if (Meteor.isServer) {
//   // This code only runs on the server
//   Meteor.publish('Plants', function PlantsPublication() {
//     return Plants.find();
//   });
// }

/**
 * Create the schema for Plants
 */
export const PlantsSchema = new SimpleSchema({
  vernacularName: {
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
  decimalLatitude: {
    label: 'DecimalLatitude',
    type: Number,
    decimal: true,
    optional: false,
    max: 90,
  },
  decimalLongitude: {
    label: 'DecimalLongitude',
    type: Number,
    decimal: true,
    optional: false,
    max: 180,
  },
  plDesc: {
    label: 'PlDesc',
    type: String,
    optional: true,
    max: 300,
  },
});

Plants.attachSchema(PlantsSchema);
