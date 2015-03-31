(function (require) {
  "use strict";
  require.config({
    paths: {
//      'jquery': '../../../bower_components/jquery/dist/jquery.min',
			'angular': '../../../bower_components/angular/angular.min',
			'ngRoute': '../../../bower_components/angular-route/angular-route.min',
			'ngResource': '../../../bower_components/angular-resource/angular-resource',
			'ngSanitize': '../../../bower_components/angular-sanitize/angular-sanitize',
//				'translate': '../../../bower_components/angular-translate/angular-translate',
//				'translate-static-loader': '../../../bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files',
//				'translate-handler-log': '../../../bower_components/angular-translate-handler-log/angular-translate-handler-log'
      'app': 'app'
    },
    shim: {
//      'jquery': {deps:[], exports:'jquery'},
      'angular': {'exports': 'angular'},
      'ngRoute': {deps: ['angular'], exports: 'ngRoute'},
      'ngResource': {deps: ['angular'], exports: 'ngResource'},
      'ngSanitize': {deps: ['angular'], exports: 'ngSanitize'}
//      'ngTouch': ['angular'],
//      'translate': {deps: ['angular']},
//			'translate-static-loader': {deps: ['translate']},
//			'translate-handler-log': {deps: ['translate']}
    }
  });

  require(['angular', 'app'], function (angular,  app) {
    //manually bootstrap angular app once document is ready.
    
    angular.element(document).ready(function() {
      app().bootstrap(document);
    });
  });
}(require));
