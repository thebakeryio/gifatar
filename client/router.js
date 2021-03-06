Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {
  this.route('landing', {
    path: '/',
    template: 'editor',
    controller : 'EditorController'
  });

  this.route('editor', {
  	path: '/editor',
  	template: 'editor',
  	controller: 'EditorController'
  });

  this.route('viewer', {
    path: '/view/:id',
    template: 'viewer',
    controller: 'ViewerController'  
  });
});

Router.onBeforeAction('loading');