import { Contacts } from '../../api/contacts/contacts.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('Contacts', function publishContactsData() {
  return Contacts.find();
});