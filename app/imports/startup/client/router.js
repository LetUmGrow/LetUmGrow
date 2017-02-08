import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

//causes landing page to just display nothing
const publicRoutes = FlowRouter.group({
  name: 'public',
  // triggersEnter: [ publicRedirect ], //Currently causes pages not to render properly
});

publicRoutes.route( '/', {
  name: 'Landing_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Landing_Page' });
  },
});

const publicRedirect = ( context, redirect ) => {
  if ( Meteor.userId() ) {
    Modules.both.redirectUser( { redirect: redirect } );
  }
};

// FlowRouter.route('/', {
//   name: 'Landing_Page',
//   action() {
//     BlazeLayout.render('App_Body', { main: 'Landing_Page' });
//   },
// });

FlowRouter.route('/home-page', {
  name: 'Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Home_Page' });
  },
});

FlowRouter.route('/terms', {
  name: 'Terms_And_Conditions_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Terms_And_Conditions_Page' });
  },
});

FlowRouter.route('/faq', {
  name: 'FAQ_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'FAQ_Page' });
  },
});

FlowRouter.route('/remedy', {
  name: 'Remedy_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Remedy_Page' });
  },
});

FlowRouter.route('/tutorial', {
  name: 'Tutorial_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Tutorial_Page' });
  },
});
/*
FlowRouter.route('/list', {
  name: 'List_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'List_Stuff_Page' });
  },
});
*/

FlowRouter.route('/list-plants', {
  name: 'List_Plants_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'List_Plants_Page' });
  },
});

FlowRouter.route('/species/list', {
  name: 'List_Species_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'List_Species_Page' });
  },
});

FlowRouter.route('/add-contact', {
  name: 'Add_Contact_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Contact_Page' });
  },
});

/*
FlowRouter.route('/add', {
  name: 'Add_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Stuff_Page' });
  },
});
*/

FlowRouter.route('/add-plants', {
  name: 'Add_Plants_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Plants_Page' });
  },
});

FlowRouter.route('/laau', {
  name: 'Laau_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Laau_Page' });
  },
});
/*
FlowRouter.route('/stuff/:_id', {
  name: 'Edit_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Stuff_Page' });
  },
});
*/
FlowRouter.route('/myprofile', {
  name: 'User_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'User_Profile_Page' });
  },
});

FlowRouter.route('/edit-plants/:_id', {
  name: 'Edit_Plants_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Plants_Page' });
  },
});

FlowRouter.route('/edit-contact/:_id', {
  name: 'Edit_Contact_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Contact_Page' });
  },
});

FlowRouter.route('/species/edit/:_id', {
  name: 'Edit_Species_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Species_Page' });
  },
});

FlowRouter.route('/edit-profile/:_id', {
  name: 'Edit_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Profile_Page' });
  },
});

FlowRouter.route('/plant-map', {
  name: 'Plant_Map_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Plant_Map_Page' });
  },
});

FlowRouter.route('/plants/profile/:_id', {
  name: 'Plant_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Plant_Profile_Page' });
  },
});

FlowRouter.route('/species/profile/:_id', {
  name: 'Species_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Species_Profile_Page' });
  },
});

FlowRouter.route('/plants/display', {
  name: 'Display_Plants_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Display_Plants_Page'});
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};





/* Authenticated routes */
const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  // triggersEnter: [ authenticatedRedirect ]
});

authenticatedRoutes.route( '/users', {
  name: 'users',
  // triggersEnter: [ blockUnauthorizedAdmin ],
  action() {
    BlazeLayout.render( 'default', {yield: 'users'} );
  }
})

authenticatedRoutes.route('/managers', {
  name: 'managers',
  /* triggersEnter: [ blockUnauthorizedAdmin ], //changed blockUnauthorizedManager to blockUnauthorizedAdmin*/
  action() {
    BlazeLayout.render( 'default', { yield: 'managers' } );
  }
});

authenticatedRoutes.route( '/employees', {
  name: 'employees',
  action() {
    BlazeLayout.render( 'default', { yield: 'employee' } );
  }
});

//GROUP ROUTES

//Plant routes
// var plantRoutes = FlowRouter.group({
//   prefix: '/plants',
//   name: 'plants',
// });

//Species routes
// var speciesRoutes = FlowRouter.group({
//   prefix: '/species',
//   name: 'species ',
// });

//Routes for pages still in development
// var devRoutes = FlowRouter.group({
//   prefix: '/dev',
//   name: 'dev',
//   triggersEnter: [function(context, redirect) {
//     console.log('running group triggers');
//   }]
// });


// handling /dev route
// devRoutes.route('/', {
//   action: function() {
//     BlazeLayout.render('componentLayout', {content: 'dev'});
//   },
//   triggersEnter: [function(context, redirect) {
//     console.log('running /dev trigger');
//   }]
// });