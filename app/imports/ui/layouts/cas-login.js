import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.Cas_Login.events({
  /**
   * Handle the click on the logout link.
   * @param event The click event.
   * @returns {boolean} False.
   */
  'click .cas-logout': function casLogout(event) {
    event.preventDefault();
    Meteor.logout();
    FlowRouter.go('Landing_Page');
    return false;
  },

  /**
   * Handle the click on the login link.
   * @param event The click event.
   * @returns {boolean} False.
   */
  'click .cas-login': function casLogin(event, instance) {
    event.preventDefault();
    const callback = function loginCallback(error) {
      if (error) {
        console.log(error);
      }
    };
    Meteor.loginWithCas(callback);

    // FlowRouter.go('User_Profile_Page');

    //hides modal on landing page; need to test how it works when the user doesn't log in successfully
    $('.ui.modal.landing-page').modal('hide');

    return false;
  },
});

// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.Cas_Login.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown({
    action: 'select',
  });
});

Template.Cas_Login.helpers({
  usernameCurrent: function() {
    return Meteor.user() ? Meteor.user().profile.name : 'No current user';;
  },

  userId() {
    return Meteor.userId();
  }
});
