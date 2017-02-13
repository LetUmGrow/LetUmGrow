import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

Meteor.publish( 'users', function() {
  // let isAdmin = Roles.userIsInRole( this.userId, 'admin' );
  //
  // if ( isAdmin ) {
  //   return [
  //     Meteor.users.find( {}, { fields: { "emails.address": 1, "roles": 1 } } )
  //   ];
  // } else {
  //   return null;
  // }
});

//publish roles collection, so that roles can be updated
//probably not the most secure implementation since it is universally publishing to the client side
Meteor.publish(null, function (){
  return Meteor.roles.find({});
});