define([], function() {
  'use strict';
  function FilmsENController($scope, $anchorScroll, $location, FilmsENFactory, ScrollService, $sce, $timeout) {
    
    //filter list    
    $scope.allFilters = [
    { name: "documentary",
      title: "Documentary",
      subheader : {
        quote: "What makes the movie a movie is the editing.",
        author: "Zach Staenberg",
        tag: "documentary"
      }
    }, {
      name: "fiction",
      title: "Fiction",
      subheader : {
        quote: "When the shooting stops, the cutting begins.",
        author: "Ralph Rosenblum",
        tag: "fiction"
      }
    }, {
      name: "installation",
      title: "Installation",
      subheader : {
        quote: "Between the Black Box and the White Cube.",
        author: "Andrew V. Uroskie",
        tag: "installation"
      }
    }];
    
    $scope.playerOpened = false; // default close player
    
    //films to be filtered

    $scope.films = FilmsENFactory.query();
    
    // prototpye http://jsfiddle.net/x03o3bpj/, the filtered results
    $scope.filteredFilms = {};
 
    /**
     * HELPER Searches an array for an object with a specified property.
     */
    function indexOfObjectWithProperty (propertyName, propertyValue, array){
      for (var i = 0, len = array.length; i < len; i++){
        if (array[i][propertyName] === propertyValue) return i;
      }  
      return -1;
    }
         
    // if filter exist on url, return the subheader.
    if($location.search().filter) {
      var selectedFilter = $location.search().filter;
      //compare against valid filters                  
      var i = indexOfObjectWithProperty('name', selectedFilter, $scope.allFilters);
      if(i > -1) {
        $scope.subheader = $scope.allFilters[i].subheader;
        $scope.filteredFilms.tags = selectedFilter;
        //console.log($scope.subheader);        
      } 
      else {
        $location.search('filter', 'all');
        $scope.filteredFilms.tags = '';
        $scope.subheader = {
          quote: "Hi, I'm a filmmaker and midcut features my film works. Enjoy!",
          author: "Trang Nguyen",
          tag: "all"
        };
      } 
    } else {
      $location.search('filter', 'all');
      $scope.filteredFilms.tags ='';
      $scope.subheader = {
        quote: "Hi, I'm a filmmaker and midcut features my film works. Enjoy!",
        author: "Trang Nguyen",
        tag: "all"
      }; 
    }
        
    // if film title exist
    if($location.hash()) {
      var id= $location.hash();
      $scope.loading = true;
      $scope.playerOpened = false;
      ScrollService.scrollTo('top', 10);
      FilmsENFactory.get({filmId: id}, function(film) {        
        $scope.filmToPlay = film;
        // tell angular to trust video player source.
        $scope.filmToPlay.vidSrc = $sce.trustAsResourceUrl(film.vidSrc);
      });
      $timeout(function() {
        $scope.playerOpened = true;
        $scope.loading = false;
      });
    }
    
    // show film within a filter.
    $scope.showFilm = function(id) {
      $scope.loading = true;
      
      ScrollService.scrollTo('top', 10);
      
      if($scope.playerOpened = true) {
        $scope.playerOpened = true;
      } else {
        $timeout(function() {
          $scope.playerOpened = true;         
          $location.url('/en/film?filter='+currentFilter+'#'+id, false);          
        });
      }
      var currentFilter = $location.search().filter;
      FilmsENFactory.get({filmId: id}, function(film) {
        $scope.filmToPlay = film;
        $scope.loading = false; 
        // tell angular to trust video player source.
        $scope.filmToPlay.vidSrc = $sce.trustAsResourceUrl(film.vidSrc);                            
      });

    };
   
  }
  
  FilmsENController.$inject=['$scope', '$anchorScroll', '$location', 'FilmsENFactory', 'ScrollService', '$sce', '$timeout'];
  return FilmsENController;
});