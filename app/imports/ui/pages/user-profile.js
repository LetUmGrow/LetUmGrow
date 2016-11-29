/**
 * Created by wlmullen on 11/14/16.
 */
import { Template } from 'meteor/templating';
import { Stuff } from '../../api/contacts/contacts.js';

Template.List_Stuff_Page.helpers({

  /**
   * @returns {*} All of the Contacts documents.
   */
  contactsList() {
    return Contacts.find();
  },
});