import {Species} from '../../api/species/species.js';
import {_} from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const speciesSeeds = [
  {

  },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Species.find().count() === 0) {
  _.each(speciesSeeds, function seedSpecies(species) {
    Species.insert(species);
  });
}
