import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Plants, PlantsSchema } from '../../api/plants/plants.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

const displayErrorMessages = 'displayErrorMessages';

Meteor.startup(function () {
  GoogleMaps.load({ key: 'AIzaSyBBkGBcI1a-ZC9e0PsxeOSVOP02IzcjQwo' });
  Geolocation.latLng();
});

Template.Add_Plants_Form.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
  addPlantsFormMapOptions: function () {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(21.2985117, -157.8185832),
        zoom: 17
      };
    }
  },
  currentLocation() {
    let foobar= Geolocation.latLng();
    console.log(foobar.lat);
    console.log(foobar.lng);
  },
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  }
});


Template.Add_Plants_Form.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = PlantsSchema.namedContext('Create_PlantsData_Page');



  GoogleMaps.ready('Add Plants Form Map', function (map) {
    // console.log("I'm ready!");
    // map.setMyLocationEnabled(true);
    google.maps.event.addListener(map.instance, 'click', function (event) {

      //adds a plant object to the Plants collection with coordinates where the user clicked on the map
      // Plants.insert({ decimalLatitude: event.latLng.lat(), decimalLongitude: event.latLng.lng(), addedBy: Meteor.user().profile.name});

      //create objects for the location coordinates
      let latitudeField= document.getElementById('decimalLatitude');
      let longitudeField= document.getElementById('decimalLongitude');

      //populates the form's location coordinate fields with
      latitudeField.value= event.latLng.lat();
      longitudeField.value= event.latLng.lng();

      // let foobar= Geolocation.latLng();
      // console.log(foobar.lat());
      // console.log(foobar.lng());
      console.log(Geolocation.latLng());
      //test code
      // console.log(latitudeField.value);
      // console.log(longitudeField.value);
      // console.log(Meteor.user().profile.name);
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
    const addedBy = Meteor.user().profile.name;

    const newPlant = { vernacularName, scientificName, decimalLatitude, decimalLongitude, plDesc, addedBy };
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
  'click .geolocation-button' (event, instance) {
    var currentLocation= Geolocation.latLng();
    alert(`current location is: ${currentLocation.lat} ${currentLocation.lng}`);

    //create objects for the location coordinates
    let latitudeField= document.getElementById('decimalLatitude');
    let longitudeField= document.getElementById('decimalLongitude');

    //populates the form's location coordinate fields with
    latitudeField.value= currentLocation.lat;
    longitudeField.value= currentLocation.lng;
  }
});

