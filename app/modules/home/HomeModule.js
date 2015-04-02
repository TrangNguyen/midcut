define(['angular', 'home/HomeController', 'home/ScrollService', 'home/SlideDownDirective'], function(angular, HomeController, ScrollService, SlideDownDirective) {
  'use strict';
  var moduleName='home-module';
  var module= angular.module(moduleName, []);
  
  module.controller('HomeController', HomeController);
  module.service('ScrollService', ScrollService);
  module.directive('slideDown', SlideDownDirective);
  
  module.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/en/about', {
      templateUrl: 'modules/home/about.html'
    });
  }]);
  
  
  
  return function () {
    return moduleName;
  };
});