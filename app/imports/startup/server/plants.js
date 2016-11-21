import {Plants} from '../../api/plants/plants.js';
import {_} from 'meteor/underscore';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
const plantSeeds = [
  {
    vernacularName: 'Chaulmoogra',
    scientificName: 'Hydnocarpus anthelmintica',
    decimalLongitude: '21.297557',
    decimalLatitude: '-157.820162',
    plDesc: 'This tree was was originally planted in 1935 by King Prajadhipok of Siam  â€˜ewa of old Farrington Hall, to honor Alice Ball for her work.  When Queen Liliâ€˜uokalani Student Services Center was built, the tree was relocated to its present place.',
  },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Plants.find().count() === 0) {
  _.each(plantSeeds, function seedPlants(plant) {
    Plants.insert(plant);
  });
}
