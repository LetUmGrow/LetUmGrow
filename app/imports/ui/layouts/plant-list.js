import { Template } from 'meteor/templating';
import { Plants } from '../../api/plants/plants.js';

Template.Plant_List.helpers({

  /**
   * @returns {*} All of the Plants documents.
   */
  plantList() {
    return Plants.find();
  },
});
/**
 * Created by matthew on 12/2/2016.
 */
