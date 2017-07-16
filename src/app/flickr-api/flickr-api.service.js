'use strict';
 
 angular.
    module('flickrApi').
    factory('flickrApiService', ['$http', '$q', function($http, $q){
 
        return {
         
            fetchPhotosByLocationCoords: function(coords, currentPage, perPage) {
                return $http.get("https://api.flickr.com/services/rest/?" +
                    "method=flickr.photos.search" +
                    "&api_key=22e34d5321f4fe640f22e09ac580bb19" +
                    "&lat="+ coords.lat().toFixed(4) + 
                    "&lon=" + coords.lng().toFixed(4) +
                    "&page=" + currentPage + 
                    "&per_page=" + perPage + 
                    "&format=json" +
                    "&nojsoncallback=1")
                    .then(
                        function(response){
                            return response.data;
                        }, 
                        function(errResponse){
                            return $q.reject(errResponse);
                        }
                    );
            }

        }
    }]);