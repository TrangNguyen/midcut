define([], function() {
  'use strict';
  function HomeController($scope, $location) {
    
    
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
    //if filmscontroller return a filter
    $scope.$on('selectedFilter', function(event, value) {
      $scope.selectedFilter = value;
    });
    
    // when a filter on menu is selected
    $scope.changeFilter = function(tag) {
      var j = indexOfObjectWithProperty('title', tag, $scope.allFilters);
      if( j > -1) {
        $scope.selectedFilter = tag;
      }
      else {
        $location.search('filter', 'all');
        $scope.selectedFilter = "All Films";
      }
      $scope.toggle=!$scope.toggle;// close menu list
    };
       
  }
  
  HomeController.$inject=['$scope', '$location'];
  return HomeController;
});