define([], function(){
  'use strict';
  
  function FilmsENFactory($resource) {
    return $resource('../app/filmresources/:filmId.json', {}, {
      query: {method:'GET', params:{filmId:'films'}, isArray:true}
    });  
  }
  FilmsENFactory.$inject=['$resource'];
  return FilmsENFactory;

});

//search method can be called as FilmsENFactory.$search({tags: 'abc'});