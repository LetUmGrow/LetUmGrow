/**
 * Created by ms on 7/4/2017.
 */
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.If_Admin.helpers({
  isAdmin: function isAdmin(){
    //return if user is Admin
    console.log(`returning if the user is admin: ${Meteor.user.role}`);
    return Meteor.user.role === 'admin';
  },
});