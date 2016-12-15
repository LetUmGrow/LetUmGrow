import {FlowRouter} from 'meteor/kadira:flow-router';
import {Template} from 'meteor/templating';
import {Species} from '../../api/species/species.js';
import {Meteor} from 'meteor/meteor';

/* eslint-disable object-shorthand, no-unused-vars */

Template.Species_Profile_Page.helpers({
  species() {
    return Species.findOne(FlowRouter.getParam('_id'));
  },
  speciesCollection() {
    return Species;
  },
});

Template.Species_Profile_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Species');
  });
});
