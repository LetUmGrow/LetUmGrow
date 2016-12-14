import {FlowRouter} from 'meteor/kadira:flow-router';
import {Template} from 'meteor/templating';
import {Plants} from '../../api/plants/plants.js';

/* eslint-disable object-shorthand, no-unused-vars */



Template.Plant_Profile_Page.helpers({
  getDoc() {
    return Plants.findOne(FlowRouter.getParam('_id'));
  },
  plantsCollection() {
    return Plants;
  },
});

Template.Plant_Profile_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Plants');
  });
});

Template.Plant_Profile_Page.events({
  /*
   * deletes plant
   */
  'click .delete'(event, instance) {
    event.preventDefault();

    const removeConfirmation = window.confirm('Do you really want to delete this entry?');

    if (removeConfirmation === true) {
      Plants.remove(FlowRouter.getParam('_id'));
      FlowRouter.go('Plant_Map_Page');
    }
  },
});
