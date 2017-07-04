/**
 * Created by ms on 2/27/2017.
 */



let route = (options) => {
  return options && options.redirect ? _sendUserToDefault(options.redirect) : _sendUserToDefault();
};

var sendUserToDefault = (redirect) => {
  let roles = _getCurrentUserRoles();

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
};

let getCurrentUserRoles = () => {
  return Roles.getRolesForUser(Meteor.userId());
};

let redirectUser = (path, redirect) => {
  if (redirect) {
    redirect(path);
  } else {
    FlowRouter.go(FlowRouter.path(path));
  }
};

// Modules.both.redirectUser = route;
