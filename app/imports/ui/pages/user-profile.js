/**
 * Created by wlmullen on 11/14/16.
 */
import { Template } from 'meteor/templating';
import { Contacts } from '../../api/contacts/contacts.js';
import { Meteor } from 'meteor/meteor';

Template.User_Profile_Page.helpers({

  /**
   * @returns {*} All of the Contacts documents.
   */
  contactsList() {
    return Contacts.find();
  },
});

Template.User_Profile_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Contacts');
  });
});
