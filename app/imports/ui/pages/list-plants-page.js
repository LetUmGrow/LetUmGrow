import { Template } from 'meteor/templating';
import { Plants } from '../../api/plants/plants.js';

Template.List_Plants_Page.helpers({

  /**
   * @returns {*} All of the Plants documents.
   */
  plantsList() {
    return Plants.find();
  },
});
