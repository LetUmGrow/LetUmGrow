/**
 * Created by wlmullen on 11/14/16.
 */
import { Template } from 'meteor/templating';
import { Contacts } from '../../api/contacts/contacts.js';
import { UserInfo } from '../../api/userInfo/userInfo.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

Template.User_Profile_Page.onCreated(function onCreated() {
//  let usernameCurrent = Meteor.user().username;
  this.autorun(() => {
    this.subscribe('Contacts');
  });
  this.autorun(() => {
    this.subscribe('UserInfo');
  });
  this.autorun(() => {
    this.subscribe('MyUser');
  });
});

Template.User_Profile_Page.helpers({

  /**
   * @returns {*} All of the Contacts documents.
   */

  contactsList() {
    return Contacts.find();
  },
/*
  myUserList() {
    return myUser.find();
  },
*/
  userList() {
    return UserInfo.find();
  },
  usernameCurrent: function() {
    return Meteor.user() ? Meteor.user().profile.name : 'No current user';
  },
  userId() {
    return Meteor.userId();
  },
  myUser() {
    let username = Meteor.user() ? Meteor.user().profile.name : 'No current user';
    let userId = Meteor.userId();
    if (UserInfo.find({username: username}).count() === 0) {
      UserInfo.insert({ owner: userId, username: username, email: `${username}@hawaii.edu`, first: 'Eponymous', last: 'User', photoUrl: '' });
    }
    return UserInfo.find({ username: username});
  },
});


