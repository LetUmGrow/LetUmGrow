import {FlowRouter} from 'meteor/kadira:flow-router';
import {Template} from 'meteor/templating';
import {Plants} from '../../api/plants/plants.js';
import {Species} from '../../api/species/species.js';
import {Meteor} from 'meteor/meteor';

/* eslint-disable object-shorthand, no-unused-vars */

Meteor.startup(function () {
  GoogleMaps.load({ key: 'AIzaSyBBkGBcI1a-ZC9e0PsxeOSVOP02IzcjQwo' });
});

Template.Plant_Profile_Page.helpers({
  plant() {
    return Plants.findOne(FlowRouter.getParam('_id'));
  },
  plantsCollection() {
    return Plants;
  },
  plantProfileMapOptions: function () {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      let plant= Plants.findOne(FlowRouter.getParam('_id'));

      //Used to test if location coordinates initialized
      // alert(`${plant.decimalLatitude}, ${plant.decimalLongitude}`);

      return {
        center: new google.maps.LatLng(plant.decimalLatitude, plant.decimalLongitude), //plant.decimalLatitude, plant.decimalLongitude
        zoom: 17,
      };
    }
  },
  species() {
    const plant = Plants.findOne(FlowRouter.getParam('_id'));
    const scientificName = plant.scientificName;
    return Species.findOne({scientificName: scientificName});
  }
});

Template.Plant_Profile_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Plants');
  });
  this.autorun(() => {
    this.subscribe('Species');
  });
  GoogleMaps.ready('Plant Profile Map', function(map) {
    // google.maps.event.addListener(map.instance, 'click', function(event) {
    //   Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    // });
    let plant= Plants.findOne(FlowRouter.getParam('_id'));

    //Create a marker for the plant
    var marker = new google.maps.Marker({
      // draggable: true,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(plant.decimalLatitude, plant.decimalLongitude),
      map: map.instance,
      // We store the document _id on the marker in order
      // to update the document within the 'dragend' event below.
      id: document._id,
      icon: 'http://i.imgur.com/kwQH9nw.png'
    });

    // The code shown below goes here

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
