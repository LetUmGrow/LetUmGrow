import { UserInfo } from '../../api/userInfo/userInfo.js';
import { Contacts } from '../../api/contacts/contacts.js';
import { UsersPlants } from '../../api/usersPlants/usersPlants.js';
import { UsersSpecies } from '../../api/usersSpecies/usersSpecies.js';
import { Species } from '../../api/species/species.js';
import { Plants } from '../../api/plants/plants.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('UserInfo', function publishUsersData() {
  return UserInfo.find();
});

/*
//this code doesn't work. individual page JSs need to filter collections if you want to filter only some of the time. I thought it would be cool this way, but no dice. -Bill

Meteor.publish('MyPlants', function publishMyPlantsData() {
  const owner = this.userId;
  //return owner ? Users.find({ owner }) : this.ready();
});

Meteor.publish('MySpecies', function publishMySpeciesData() {
  const owner = this.userId;
  //return owner ? Users.find({ owner }) : this.ready();
});
*/

// Contacts publication needs to be changed
Meteor.publish('Contacts', function publishContactsData() {
  const owner = this.userId;
  return owner ? Contacts.find({ owner }) : this.ready();
});

Meteor.publish('Species', function publishSpeciesData() {
  return Species.find();
});

Meteor.publish('Plants', function publishPlantsData() {
  return Plants.find();
});

// Meteor.publish( 'users', function() {
  // let isAdmin = Roles.userIsInRole( this.userId, 'admin' );
  //
  // if ( isAdmin ) {
  //   return [
  //     Meteor.users.find( {}, { fields: { "emails.address": 1, "roles": 1 } } )
  //   ];
  // } else {
  //   return null;
  // }
// });

//publish roles collection, so that roles can be updated
//probably not the most secure implementation since it is universally publishing to the client side
Meteor.publish('rolesPub', function publishRolesData(){
  return Meteor.roles.find();
});