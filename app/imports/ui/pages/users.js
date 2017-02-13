import {FlowRouter} from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
//import { Plants } from '../../api/plants/plants.js';

Template.Users_Page.onCreated( () => {
  Template.instance().subscribe( 'users' );

  let userId = Meteor.userId();

  Roles.addUsersToRoles( userId, [ 'roleOne', 'roleTwo', 'roleThree' ] );
  // console.log( Meteor.userId() );
  // if ( Roles.addUsersToRoles( userId, 'admin' ) ) {
  //   console.log( `{Meteor.user().profile.name} has been added to admin`);
  // }


  // Roles.createRole('admin');

});

Template.Users_Page.helpers({
  users: function() {
    let users = Meteor.users.find();

    if ( users ) {
      return users;
    }
  },
});

function testUserFunction() {
  alert('aaaaa');
}

// _.each(Meteor.users.find(), function() { console.log( user.username ); }, user );
