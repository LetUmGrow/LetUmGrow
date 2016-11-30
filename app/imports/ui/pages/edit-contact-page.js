import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Contacts, ContactsSchema } from '../../api/contacts/contacts.js';
import { Meteor } from 'meteor/meteor';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';

Template.Edit_Contact_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Contacts');
  });
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = ContactsSchema.namedContext('Edit_Contact_Page');
});

Template.Edit_Contact_Page.helpers({
  contactField(fieldName) {
    const contact = Contacts.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return contact && contact[fieldName];
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
});

/*
Template.Edit_Contact_Page.onRendered(function enableSemantic() {
  const template = this;
  template.subscribe('StudentData', () => {
    // Use this template.subscribe callback to guarantee that the following code executes after subscriptions OK.
    Tracker.afterFlush(() => {
      // Use Tracker.afterFlush to guarantee that the DOM is re-rendered before calling JQuery.
      template.$('select.ui.dropdown').dropdown();
      template.$('.ui.selection.dropdown').dropdown();
      template.$('select.dropdown').dropdown();
      template.$('.ui.checkbox').checkbox();
      template.$('.ui.radio.checkbox').checkbox();
    });
  });
});
*/

Template.Edit_Contact_Page.events({
  'submit .contact-data-form'(event, instance) {
    event.preventDefault();
    const email = event.target.email.value;
    const first = event.target.first.value;
    const last = event.target.last.value;
    const owner = Meteor.userId();
    const updatedContact = { email, first, last, owner };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    ContactsSchema.clean(updatedContact);
    // Determine validity.
    instance.context.validate(updatedContact);
    if (instance.context.isValid()) {
      Contacts.update(FlowRouter.getParam('_id'), { $set: updatedContact });
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('User_Profile_Page')
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
