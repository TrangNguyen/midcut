define(['angular', 'home/HomeController', 'home/ScrollService'], function(angular, HomeController, ScrollService) {
  'use strict';
  var moduleName='home-module';
  var module= angular.module(moduleName, []);
  
  module.controller('HomeController', HomeController);
  module.service('ScrollService', ScrollService);
  
  module.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/en/about', {
      templateUrl: 'modules/home/about.html'
    });
  }]);
  
  
  
  return function () {
    return moduleName;
  };
});