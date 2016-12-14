import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { UserInfo, UsersSchema } from '../../api/userInfo/userInfo.js';
import { Meteor } from 'meteor/meteor';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';

Template.Edit_Profile_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('UserInfo');
  });
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = UsersSchema.namedContext('Edit_Profile_Page');
});

Template.Edit_Profile_Page.helpers({
  userField(fieldName) {
    const user = UserInfo.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return user && user[fieldName];
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
Template.Edit_Profile_Page.onRendered(function enableSemantic() {
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

Template.Edit_Profile_Page.events({
  'submit .profile-data-form'(event, instance) {
    event.preventDefault();
    const owner = Meteor.userId();
    const username = Meteor.user() ? Meteor.user().profile.name : 'No current user';
    const email = event.target.email.value;
    const first = event.target.first.value;
    const last = event.target.last.value;
    const photoUrl = event.target.photoUrl.value;
    const updatedProfile = { owner, username, email, first, last, photoUrl };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    UsersSchema.clean(updatedProfile);
    // Determine validity.
    instance.context.validate(updatedProfile);
    if (instance.context.isValid()) {
      UserInfo.update(FlowRouter.getParam('_id'), { $set: updatedProfile });
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('User_Profile_Page')
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
