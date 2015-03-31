define(['angular', 'home/HomeController', 'home/ScrollService'], function(angular, HomeController, ScrollService) {
  'use strict';
  var moduleName='home-module';
  var module= angular.module(moduleName, []);
  
  module.controller('HomeController', HomeController);
  module.service('ScrollService', ScrollService);

  return function () {
    return moduleName;
  };
});