import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Contacts = new Mongo.Collection('Contacts');

/**
 * Create the schema for Species
 */
export const ContactsSchema = new SimpleSchema({
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
  owner: {
    label: 'owner',
    type: String,
    optional: true,
  },
});

Contacts.attachSchema(ContactsSchema);
