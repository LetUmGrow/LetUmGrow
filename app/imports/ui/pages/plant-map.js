/**
 * Created by matthew on 11/25/2016.
 */
// import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
// import { Plants } from '../../api/plants/plants.js';


/*
 * This function breaks the css styling for some reason
 */
// Template.contact.onRendered(function() {
//   GoogleMaps.load();
// });

// if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load( { key: 'AIzaSyBBkGBcI1a-ZC9e0PsxeOSVOP02IzcjQwo' } );
  });
// }

Template.Plant_Map_Page.helpers({
  plantMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(21.2985117,-157.8185832),
        zoom: 17
      };
    }
  }
});

Template.Plant_Map_Page.onCreated(function() {
//   // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('Plant Map', function(map){
    console.log("I'm ready!");
  });
//   GoogleMaps.ready('plantMap', function(map) {
//     // Add a marker to the map once it's ready
//     var marker = new google.maps.Marker({
//       position: map.options.center,
//       map: map.instance
//     });
//   });
});
