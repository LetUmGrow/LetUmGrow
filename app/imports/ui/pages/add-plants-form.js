import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Plants, PlantsSchema } from '../../api/plants/plants.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

const displayErrorMessages = 'displayErrorMessages';

Template.Add_Plants_Form.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = PlantsSchema.namedContext('Create_PlantsData_Page');
});

Template.Add_Plants_Form.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
});

Template.Add_Plants_Form.events({
  'submit .add-plants-form'(event, instance) {
    event.preventDefault();
    // Get name (text field)
    // naming convention: use camelcase for id's and lowercase with dashes for spaces with names
    const vernacularName = event.target.vernacularName.value;
    const scientificName = event.target.scientificName.value;
    const decimalLatitude = event.target.decimalLatitude.value;
    const decimalLongitude = event.target.decimalLongitude.value;
    const plDesc = event.target.plDesc.value;
    const owner = Meteor.userId();

    const newPlant = { vernacularName, scientificName, decimalLatitude, decimalLongitude, plDesc, owner };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that newPlant reflects what will be inserted.
    PlantsSchema.clean(newPlant);
    // Determine validity.
    instance.context.validate(newPlant);
    if (instance.context.isValid()) {
      Plants.insert(newPlant);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('List_Plants_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

