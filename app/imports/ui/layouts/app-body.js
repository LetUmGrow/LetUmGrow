import { Template } from 'meteor/templating';

Template.App_Body.onCreated(function appBodyOnCreated() {
  // placeholder: typically you will put global subscriptions here if you remove the autopublish package.

  //globally subscribe to the Plants collection, so every page has access to it
  //may want to change in the future for security reasons, since it probably allows landing page to access the Plants collection
  Meteor.subscribe('Plants');
});

Template.App_Body.helpers({
  // placeholder: if you display dynamic data in your layout, you will put your template helpers here.
});

Template.App_Body.events({
 // placeholder: if you add a form to this top-level layout, handle the associated events here.
});
