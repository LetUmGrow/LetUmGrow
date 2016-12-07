/**
 * Created by matthew on 11/25/2016.
 */
// import { AutoForm } from 'meteor/aldeed:autoform';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Template} from 'meteor/templating';
import {Plants} from '../../api/plants/plants.js';
import {Meteor} from 'meteor/meteor';

/*
 * This function breaks the css styling for some reason
 */
// Template.contact.onRendered(function() {
//   GoogleMaps.load();
// });

// if (Meteor.isClient) {
Meteor.startup(function () {
  GoogleMaps.load({ key: 'AIzaSyBBkGBcI1a-ZC9e0PsxeOSVOP02IzcjQwo' });
});
// }

Template.Plant_Map_Page.helpers({
  plantMapOptions: function () {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(21.2985117, -157.8185832),
        zoom: 17
      };
    }
  }
});

Template.Plant_Map_Page.onCreated(function () {
  // this.state = new ReactiveDict();

//   // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('Plant Map', function (map) {
    // console.log("I'm ready!");
    google.maps.event.addListener(map.instance, 'click', function (event) {
      Plants.insert({ decimalLatitude: event.latLng.lat(), decimalLongitude: event.latLng.lng(), addedBy: Meteor.userId()/*this.userId*/ });
      console.log("Added a point");
    });

    var plantMarkers = {};

    Plants.find().observe({
      added: function (document) {
        // Create a marker for this document
        var marker = new google.maps.Marker({
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(document.decimalLatitude, document.decimalLongitude),
          map: map.instance,
          // We store the document _id on the marker in order
          // to update the document within the 'dragend' event below.
          id: document._id,
          icon: 'http://i.imgur.com/kwQH9nw.png'
        });

        // This listener lets us drag plantMarkers on the map and update their corresponding document.
        google.maps.event.addListener(marker, 'dragend', function (event) {
          Plants.update(marker.id, {
            $set: {
              decimalLatitude: event.latLng.lat(),
              decimalLongitude: event.latLng.lng()
            }
          });
        });

        // Store this marker instance within the plantMarkers object.
        plantMarkers[document._id] = marker;
      },
      changed: function (newDocument, oldDocument) {
        plantMarkers[newDocument._id].setPosition({
          decimalLatitude: newDocument.decimalLatitude,
          decimalLongitude: newDocument.decimalLongitude
        });
      },
      removed: function (oldDocument) {
        // Remove the marker from the map
        plantMarkers[oldDocument._id].setMap(null);

        // Clear the event listener
        google.maps.event.clearInstanceListeners(
            plantMarkers[oldDocument._id]);

        // Remove the reference to this marker instance
        delete plantMarkers[oldDocument._id];
      }
    });

    // Add a marker to the map once it's ready
    // var marker = new google.maps.Marker({
    //   position: map.options.center,
    //   map: map.instance
    // });
  });
});
