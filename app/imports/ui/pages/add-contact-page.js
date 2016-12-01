import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Contacts, ContactsSchema } from '../../api/contacts/contacts.js';
import { Meteor } from 'meteor/meteor';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';

Template.Add_Contact_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = ContactsSchema.namedContext('Add_Contact_Page');
});

Template.Add_Contact_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
});

/*
Template.Add_Contact_Page.onRendered(function enableSemantic() {
  const instance = this;
  instance.$('select.ui.dropdown').dropdown();
  instance.$('.ui.selection.dropdown').dropdown();
  instance.$('select.dropdown').dropdown();
  instance.$('.ui.checkbox').checkbox();
  instance.$('.ui.radio.checkbox').checkbox();
});
*/

Template.Add_Contact_Page.events({
  'submit .contact-data-form'(event, instance) {
    event.preventDefault();
    const email = event.target.email.value;
    const first = event.target.first.value;
    const last = event.target.last.value;
    const owner = Meteor.userId();
    const newContact = { email, first, last, owner };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    ContactsSchema.clean(newContact);
    // Determine validity.
    instance.context.validate(newContact);
    if (instance.context.isValid()) {
      Contacts.insert(newContact);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('User_Profile_Page')
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
