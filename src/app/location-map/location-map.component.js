'use strict';

angular.
	module('locationMap').
	component('locationMap', {
		template: 	`<div map-lazy-load="https://maps.google.com/maps/api/js">
  						<ng-map ng-style="{ 'height': mapHeight }" center="28.7041,77.1025" zoom="8">
  				  			<marker draggable="true" position="[28.7041,77.1025]" title="Drag Me"></marker>
  				  		</ng-map>
				  	</div>`,
		controller: ['NgMap', 'PhotoGallery', '$window', '$scope', function LocationMapController(NgMap, PhotoGallery, $window, $scope){

	
			NgMap.getMap().then(function(map) {
	 
	      		var marker = map.markers[0];
    			
          		marker.addListener('dragend', function(event){
          			PhotoGallery.open(event.latLng);
          		});

          		// map.addListener('bounds_changed', function(event){
          		// 	this.panTo(marker.getPosition());
          		// });

          		angular.element($window).bind('resize', function(event){
        			$scope.updateMapHeight();
        			$scope.$apply();
        			map.panTo(marker.getPosition());
        		});

        	});

        	
			
			$scope.updateMapHeight = function(){
				$scope.mapHeight = ($window.innerHeight - 69) + 'px';
			}
			
			$scope.updateMapHeight();

		}]
	});
