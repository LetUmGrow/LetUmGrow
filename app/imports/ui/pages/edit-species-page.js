import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Species, SpeciesSchema } from '../../api/species/species.js';
import { Meteor } from 'meteor/meteor';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';

Template.Edit_Species_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Species');
  });
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = SpeciesSchema.namedContext('Edit_Species_Page');
});

Template.Edit_Species_Page.helpers({
  species() {
    return Species.findOne(FlowRouter.getParam('_id'));
  },
  speciesField(fieldName) {
    const species = Species.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return species && species[fieldName];
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
});

/*
Template.Edit_Profile_Page.onRendered(function enableSemantic() {
  const template = this;
  template.subscribe('StudentData', () => {
    // Use this template.subscribe callback to guarantee that the following code executes after subscriptions OK.
    Tracker.afterFlush(() => {
      // Use Tracker.afterFlush to guarantee that the DOM is re-rendered before calling JQuery.
      template.$('select.ui.dropdown').dropdown();
      template.$('.ui.selection.dropdown').dropdown();
      template.$('select.dropdown').dropdown();
      template.$('.ui.checkbox').checkbox();
      template.$('.ui.radio.checkbox').checkbox();
    });
  });
});
*/

Template.Edit_Species_Page.events({
  'submit .species-data-form'(event, instance) {
    event.preventDefault();
    const species = Species.findOne(FlowRouter.getParam('_id'));
    const UHSP_ID = species.UHSP_ID;
    const pictureUrl = event.target.pictureUrl.value;
    const family = event.target.family.value;
    const scientificName = species.scientificName;
    const HawaiianName = event.target.HawaiianName.value;
    const vernacularName = event.target.vernacularName.value;
    const description = event.target.description.value;
    const spClass = event.target.spClass.value;
    const habit = event.target.habit.value;
    const origin = event.target.origin.value;
    const biogeography = event.target.biogeography.value;
    const threat = event.target.threat.value;
    const updatedSpecies = { UHSP_ID, pictureUrl, family, scientificName, HawaiianName, vernacularName, description, spClass, habit, origin, biogeography, threat };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newStudentData reflects what will be inserted.
    SpeciesSchema.clean(updatedSpecies);
    // Determine validity.
    instance.context.validate(updatedSpecies);
    if (instance.context.isValid()) {
      Species.update(FlowRouter.getParam('_id'), { $set: updatedSpecies });
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('List_Species_Page')
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
