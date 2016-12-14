import {Template} from 'meteor/templating';
import {Species} from '../../api/species/species.js';

Template.List_Species_Page.helpers({
  /**
   * @returns {*} All of the Plants documents.
   */
  speciesList() {
    return Species.find();
  },

});

Template.List_Species_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Species');
    // this.subscribe('users');

    // Meteor.publish('users', function () {
    //   return Meteor.users.find({});
    // });
  });
});

Template.List_Species_Page.events({
  /*
   * deletes plant; doesn't work
   */
  // 'click .delete'(event, instance) {
  //   event.preventDefault();
  //   // Get name (text field)
  //
  //   // Contacts.remove(event.target._id.value);
  //
  //   // Contacts.remove( { event.target._id.value } );
  //   // Contacts.remove({_id: event.target._id.value });
  //
  //   const removeConfirmation = window.confirm('Do you really want to delete this entry?');
  //
  //   if (removeConfirmation === true) {
  //     Plants.remove(FlowRouter.getParam('_id'));
  //     FlowRouter.go('List_Plants_Page');
  //   }
  // },
});