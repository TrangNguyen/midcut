define(['angular', 'film/FilmsENController', 'film/FilmsENFactory'], function(angular, FilmsENController, FilmsENFactory) {
  'use strict';
  var moduleName='film-module';
  var module= angular.module(moduleName, ['ngRoute']);
  
  module.controller('FilmsENController', FilmsENController);
  module.factory('FilmsENFactory', FilmsENFactory);

  
  module.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/en/film', {
      templateUrl: 'modules/film/films.html',
      controller: FilmsENController,
      reloadOnSearch:false    
    });
  }]);

  return function () {
    return moduleName;
  };
});