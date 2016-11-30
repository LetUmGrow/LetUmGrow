import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { Plants } from '../../api/plants/plants.js';

/* eslint-disable object-shorthand, no-unused-vars */

/**
 * After successful addition of a new Plants document, go to List page.
 * See: https://github.com/aldeed/meteor-autoform#callbackshooks
 */
AutoForm.hooks({
  AddPlantsForm: {
    /**
     * After successful form submission, go to List_Plants_Page.
     * @param formType The form.
     * @param result The result of form submission.
     */
    onSuccess: function onSuccess(formType, result) {
      FlowRouter.go('List_Plants_Page');
    },
  },
});

Template.Add_Plants_Page.helpers({
  plantsCollection() {
    return Plants;
  },
});

Template.Add_Plants_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Plants');
  });
});