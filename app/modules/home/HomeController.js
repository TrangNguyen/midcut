define([], function() {
  'use strict';
  function HomeController($scope, $location, $window) {
    
    
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
         
    // if filter exist on url, return the selectedFilter.
    if($location.search().filter) {
      var selectedFilter = $location.search().filter;
      //compare against valid filters                  
      var i = indexOfObjectWithProperty('name', selectedFilter, $scope.allFilters);
      if(i > -1) {
        $scope.selectedFilter = $scope.allFilters[i].title;
        //console.log($scope.subheader);        
      } 
      else {
        $location.search('filter', 'all');
        $scope.selectedFilter = "All Films";
      } 
    } else {
      $location.search('filter', 'all');
      $scope.selectedFilter = "All Films";
    }
    
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
  
  HomeController.$inject=['$scope', '$location', '$window'];
  return HomeController;
});