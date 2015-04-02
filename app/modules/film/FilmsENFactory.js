define([], function(){
  'use strict';
  
  function FilmsENFactory($resource) {
    return $resource('filmresources/:filmId.json', {}, {
      query: {method:'GET', params:{filmId:'films'}, isArray:true}
    });  
  }
  FilmsENFactory.$inject=['$resource'];
  return FilmsENFactory;

});
