import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Species = new Mongo.Collection('Species');

/**
 * Create the schema for Species
 */
export const SpeciesSchema = new SimpleSchema({
  UHSP_ID: {
    label: 'SpeciesID',
    type: String,
    max: 20,
    optional: true,
    autoform: {   //can this be AI?
      group: 'Species',
      placeholder: '1',
    },
  },
  // pictures: [], //needs more
  family: {
    label: 'Family',
    type: String,
    optional: true,
    max: 30,
    autoform: {
      group: 'Species',
      placeholder: 'Family',
    },
  },
  scientificName: {
    label: 'Scientific Name',
    type: String,
    optional: true,
    max: 70,
    autoform: {
      group: 'Species',
      placeholder: 'Scientific Name',
    },
  },
  HawaiianName: {
    label: 'Hawaiian Name',
    type: String,
    optional: true,
    max: 50,
    autoform: {
      group: 'Species',
      placeholder: 'Hawaiian Name',
    },
  },
  vernacularName: {
    label: 'Vernacular Name',
    type: String,
    optional: true,
    max: 100,
    autoform: {
      group: 'Species',
      placeholder: 'Vernacular Name',
    },
  },
  description: {
    label: 'Description',
    type: String,
    optional: true,
    max: 4000,
    autoform: {
      group: 'Species',
      placeholder: 'Description',
    },
  },
  spClass: {
    label: 'Species Classification',
    type: String,
    optional: true,
    max: 50,
    autoform: {
      group: 'Species',
      placeholder: 'Species Classification',
    },
  },
  habit: {
    label: 'Habit',
    type: String,
    optional: true,
    max: 50,
    autoform: {
      group: 'Species',
      placeholder: 'Habit',
    },
  },
/*
   uses: {
     label: 'Uses',
     type: String,
     optional: true,
     max: 250,
     autoform: {
     group: 'Species',
     placeholder: 'Uses',
     },
   },
*/
  origin: {
    label: 'Origin',
    type: String,
    optional: true,
    max: 50,
    autoform: {
      group: 'Species',
      placeholder: 'Origin',
    },
  },
  biogeography: {
    /* native, endemic, transplant, aggressive invader, etc. */
    label: 'Biogeography',
    type: String,
    optional: true,
    max: 250,
    autoform: {
      group: 'Species',
      placeholder: 'Biogeography',
    },
  },
  threat: {
    /* endangered, etc. */
    label: 'Threat',
    type: String,
    optional: true,
    max: 50,
    autoform: {
      group: 'Species',
      placeholder: 'Threat',
    },
  },
  /*  roots: {},
   stems: {},
   fruit: {},
   flowers: {},
   leaves: {
   shape: {}, // (lots of variations)
   arrangement: {}, // alternate, opposite, whorled, nil
   compound: {}, // unifoliate, bifoliate, trifoliate, palmate, even-pinnate, odd-pinnate, even-bipinnate
   margins: {}, //entire, lobed, dissected
   apices: {}, // mucronate, acuminate, attenuate, rounded, emarginate, truncate
   bases: {}, // cordate, auriculate, sagittate, cuneate, truncate, asymmetrical
   teeth: {}, // serrate, doubly-serrate, crenate, dentate
   Venation: {}, // pinnate, plinervy, palmate, parallel, rotate
   },
   lastEditedBy: {},
   timeLastEdited: {}, */
});

Species.attachSchema(SpeciesSchema);
