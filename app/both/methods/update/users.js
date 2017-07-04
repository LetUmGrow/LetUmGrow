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
      console.log(`${options.user} is now a(n) ${options.role}`);
    } catch( exception ) {
      return exception;
    }

    if( Roles.userIsInRole(options.user, options.role) ){
      console.log(`${options.user} is in ${options.role}`);
    } else {
      console.log(`is not in role`);
    }
  },

  route( options ){
    return options && options.redirect ? _sendUserToDefault(options.redirect) : _sendUserToDefault();
  },

  sendUserToDefault(redirect) {
    let roles = getCurrentUserRoles();

    if (roles[0] === 'admin') {
      // _redirectUser( 'users', redirect );
      _redirectUser('Users_Page', redirect);
    }

    if (roles[0] === 'manager') {
      _redirectUser('Managers_Page', redirect);
    }

    if (roles[0] === 'employee') {
      _redirectUser('Employees_Page', redirect);
    }
  },

  getCurrentUserRoles() {
    return Roles.getRolesForUser(Meteor.userId());
  },

  redirectUser(path, redirect) {
    if (redirect) {
      redirect(path);
    } else {
      FlowRouter.go(FlowRouter.path(path));
    }
  },

// Modules.both.redirectUser = route;


});