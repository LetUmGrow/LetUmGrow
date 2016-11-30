import { Contacts } from '../../api/contacts/contacts.js';
import { Species } from '../../api/species/species.js';
import { Plants } from '../../api/plants/plants.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('Contacts', function publishContactsData() {
  const owner = this.userId;
  return owner ? Contacts.find({ owner }) : this.ready();
});

Meteor.publish('Species', function publishSpeciesData() {
  return Species.find();
});

Meteor.publish('Plants', function publishPlantsData() {
  return Plants.find();
});