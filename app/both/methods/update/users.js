import { Meteor } from 'meteor/meteor';

/* Adapted from https://themeteorchef.com/tutorials/building-a-user-admin */
Meteor.methods({
  setRoleOnUser( options ) {
    check( options, {
      user: String,
      role: String
    });

    try {
      Roles.setUserRoles( options.user, [ options.role ] );
    } catch( exception ) {
      return exception;
    }

    if( Roles.userIsInRole(options.user, options.role) ){
      console.log(`${options.user} is in ${options.role}` );
    } else {
      console.log(`is not in role` );
    }
  }


});