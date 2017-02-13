import {FlowRouter} from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import {Meteor} from 'meteor/meteor';


Template.Users_Page.onCreated( function(){
// Template.Users_Page.onCreated( () => {

  if(Roles.subscription.ready()){
    console.log('Roles subscription is ready');
  }
  else {
    console.log('Roles subscription is not ready');
  }

  // if(users.subscription.ready()){
  //   console.log('users subscription is ready');
  // }
  // else {
  //   console.log('users subscription is not ready');
  // }

  // Roles.addUsersToRoles(Meteor.userId() , 'testRole01');
  // Roles.addUsersToRoles(Meteor.userId() , 'testRole01');

  let userId= Meteor.userId();

  // Roles.setUserRoles(userId, 'testRole01'); //doesn't seem to work
  Roles.addUsersToRoles(userId , 'testRole01');


  if( Roles.userIsInRole(userId, 'testRole01') ){
    console.log(`${userId} is in testRole01 role` );
  } else {
    console.log(`${userId} is not in testRole01 role` );
  }

  // Roles.createRole('admin');
  // if( Roles.userIsInRole(Meteor.userId(), 'testRole02') ){
  //   console.log(`${Meteor.userId()} is in testRole02 role` );
  // } else {
  //   console.log(`${Meteor.userId()} is not in testRole02 role` );
  // }
});

Template.Users_Page.helpers({
  users: function() {
    let users = Meteor.users.find();

    console.log('yesterday all my troubles seemed so far away');

    if ( users ) {
      return users;
    }
  },
});
