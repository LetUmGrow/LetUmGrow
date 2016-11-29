import { Contacts } from '../../api/contacts/contacts.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('Contacts', function publishContactsData() {
  const owner = this.userId;
  return owner ? Contacts.find({ owner }) : this.ready();
});