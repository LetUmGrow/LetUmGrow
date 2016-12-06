import {Template} from 'meteor/templating';
import {Plants} from '../../api/plants/plants.js';

Template.List_Plants_Page.helpers({
  /**
   * @returns {*} All of the Plants documents.
   */
  plantsList() {
    return Plants.find();
  },

});

Template.List_Plants_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Plants');
  });
});

Template.List_Plants_Page.events({
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