import {Contacts} from '../../api/contacts/contacts.js';
import {_} from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const contactsSeeds = [
  {
    email: 'wlmullen@hawaii.edu',
    first: 'Bill',
    last: 'Mullen',
    /* owner: Meteor.settings.defaultAccount.userId, */
    owner: Meteor.users.findOne({ username: Meteor.settings.defaultAccount.username })._id,
    /*may need to change this in the future for security?*/
  },
  {
    email: 'nahinan@hawaii.edu',
    first: 'Nathan',
    last: 'Nahina',
    owner: Meteor.users.findOne({ username: Meteor.settings.defaultAccount.username })._id, /*owner: this.userId,*/
    /*may need to change this in the future for security?*/
  },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Contacts.find().count() === 0) {
  _.each(contactsSeeds, function seedContacts(contact) {
    Contacts.insert(contact);
  });
}
