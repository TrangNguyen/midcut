define([], function() {
  'use strict';
  function HomeController($scope, $location, $window, ScrollService) {    
    
    //filter list    
    $scope.allFilters = [
    { name: "documentary",
      title: "Documentary"
    }, {
      name: "fiction",
      title: "Fiction"
    }, {
      name: "installation",
      title: "Installation"
    }];
    
    /**
     * HELPER Searches an array for an object with a specified property.
     */
    function indexOfObjectWithProperty (propertyName, propertyValue, array){
      for (var i = 0, len = array.length; i < len; i++){
        if (array[i][propertyName] === propertyValue) return i;
      }  
      return -1;
    }    
    // Treat about route specially    
    if($location.path().split('/')[2]==="about") {
      $scope.selectedFilter = "About me";    
    }
    //if filmscontroller return a filter
    $scope.$on('selectedFilter', function(event, value) {
      $scope.selectedFilter = value;
    });
        
    // when a filter on menu is selected
    $scope.changeFilter = function(tag) {
      // treat about route differently
      if(tag==='about') {
        $scope.selectedFilter = "About me";
      } else {
        var j = indexOfObjectWithProperty('title', tag, $scope.allFilters);
        if( j > -1) {
          $scope.selectedFilter = tag;
        } else {
          $location.search('filter', 'all');
          $scope.selectedFilter = "All Films";
        }
      }
      $scope.toggle=!$scope.toggle;// close menu list
    };
    
    //off by one bug case from footer
    $scope.goToAbout = function() {
      $scope.selectedFilter = "About me";
      ScrollService.scrollTo('top', 10);
      $window.location.href="#/en/about";  
    };
  }
  
  HomeController.$inject=['$scope', '$location', '$window',  'ScrollService'];
  return HomeController;
});