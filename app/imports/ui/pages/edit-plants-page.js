import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { Plants } from '../../api/plants/plants.js';

/* eslint-disable object-shorthand, no-unused-vars */

/**
 * After successful edit, go to List page.
 * See: https://github.com/aldeed/meteor-autoform#callbackshooks
 */
AutoForm.hooks({
  EditPlantsForm: {
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

Template.Edit_Plants_Page.helpers({
  getDoc() {
    return Plants.findOne(FlowRouter.getParam('_id'));
  },
  plantsCollection() {
    return Plants;
  },
});

