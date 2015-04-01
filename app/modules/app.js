/*
This is the top app level file, where all modules are registered as dependencies and bootstrap to the app. The default route also set here in the config.
*/

define(['angular', 'ngRoute', 'ngResource', 'ngSanitize', 'ngAnimate', 'home/HomeModule', 'film/FilmModule' ],
    function (angular, ngRoute, ngResource, ngSanitize, ngAnimate, filmModule, homeModule) {
  "use strict";
  var appName = "app";

  var dependencies = ['ngRoute', 'ngResource', 'ngSanitize', 'ngAnimate', filmModule(), homeModule()];

  var app = angular.module(appName, dependencies);

  app.config([ '$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    //if user types unmatched urls
    $routeProvider.otherwise({
      redirectTo: '/en/film'
    });

  }]);
  
//this allow us to change the url without reload controller. if call ($location.url( <path>, false);
  app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    var original = $location.url;
    $location.url = function (path, reload) {
      if (reload === false) {
        var lastRoute = $route.current.params;
        var un = $rootScope.$on('$locationChangeSuccess', function () {
          $route.current.params = lastRoute;
          un();
        });
      }
      return original.apply($location, [path]);
    };
  }]);
  
  //because there is fixed positioned element-nav
  app.run(['$anchorScroll', function($anchorScroll) {
    $anchorScroll.yOffset = 54;   // always scroll by 50 extra pixels
  }]);
  
//manual bootstrap angular to make sure jquery and other have loaded.
  return function () {
    return {
      bootstrap: function (element) {
        angular.bootstrap(element, [appName]);
      }
    };
  };
});
