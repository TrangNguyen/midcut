define([], function() {
  'use strict';
  function FilmsENController($scope, $anchorScroll, $location, FilmsENFactory, ScrollService, $sce) {
    
    //filter list    
    $scope.allFilters = [
    { name: "documentary",
      title: "Documentary",
      subheader : {
        quote: "What makes the movie a movie is the editing.",
        author: "Zach Staenberg"
      }
    }, {
      name: "fiction",
      title: "Fiction",
      subheader : {
        quote: "When the shooting stops, the cutting begins.",
        author: "Ralph Rosenblum"
      }
    }, {
      name: "installation",
      title: "Installation",
      subheader : {
        quote: "Between the Black Box and the White Cube.",
        author: "Andrew V. Uroskie"
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
          quote: "I make films because I have something to share.",
          author: "Trang Nguyen"
        };
      } 
    } else {
      $location.search('filter', 'all');
      $scope.filteredFilms.tags ='';
      $scope.subheader = {
        quote: "I make films because I have something to share.",
        author: "Trang Nguyen"
      }; 
    }
        
    // if film title exist
    if($location.hash()) {
      var id= $location.hash();
      FilmsENFactory.get({filmId: id}, function(film) {
        $scope.playerOpened = true;
        $scope.filmToPlay = film;
        // tell angular to trust video player source.
        $scope.filmToPlay.vidSrc = $sce.trustAsResourceUrl(film.vidSrc);
      });
      ScrollService.scrollTo(id);
    }
    
    // show film within a filter.
    $scope.showFilm = function(id) {
      var currentFilter = $location.search().filter;
      FilmsENFactory.get({filmId: id}, function(film) {
        $scope.playerOpened = true;
        $scope.filmToPlay = film;
        // tell angular to trust video player source.
        $scope.filmToPlay.vidSrc = $sce.trustAsResourceUrl(film.vidSrc);
        $location.url('/en/film?filter='+currentFilter+'#'+id, false);
        ScrollService.scrollTo(id);               
      });
        
    };
   
  }
  
  FilmsENController.$inject=['$scope', '$anchorScroll', '$location', 'FilmsENFactory', 'ScrollService', '$sce'];
  return FilmsENController;
});