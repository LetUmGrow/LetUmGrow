/**
 * Created by wlmullen on 11/14/16.
 */
import { Template } from 'meteor/templating';
import { Contacts } from '../../api/contacts/contacts.js';
import { UserInfo } from '../../api/userInfo/userInfo.js';
import { Meteor } from 'meteor/meteor';

Template.User_Profile_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Contacts');
    this.subscribe('MyUser');
    this.subscribe('UserInfo');
  });
});

Template.User_Profile_Page.helpers({

  /**
   * @returns {*} All of the Contacts documents.
   */
  contactsList() {
    return Contacts.find();
  },
  myUserList() {
    return myUser.find();
  },
  userList() {
    return UserInfo.find();
  },
});


