'use strict';

angular.
	module('photoGallery').
	factory('PhotoGallery', ['$uibModal', 'flickrApiService', photoGalleryModal]);

	const modalTemplate = `
        <div class="photo-gallery">
            <div class="modal-header">
                <h3 class="modal-title">
                    User Location Photos
                </h3>
            </div>
            <div class="modal-body">
            	  <div uib-alert ng-show="photosArray.length < 1" class="alert alert-danger">No images found for this location.</div>

            	<div class="row" ng-repeat="photo in photosArray" ng-if="$index % 3 == 0">
            		<div class="img-container-resp col-xs-4 col-sm-4 col-md-4 col-lg-4">
            			<img class="img-responsive" ng-src="{{ constructImageUrl($index) }}" />
            		</div>
            		<div class="img-container-resp col-xs-4 col-sm-4 col-md-4 col-lg-4">
            			<img class="img-responsive" ng-src="{{ constructImageUrl($index + 1) }}" />
            		</div>
            		<div class=" img-container-resp col-xs-4 col-sm-4 col-md-4 col-lg-4">
            			<img class="img-responsive" ng-src="{{ constructImageUrl($index + 2) }}" />
            		</div>
				</div>
            </div>
            <div class="modal-footer">
            	<ul uib-pagination max-size="maxSize" items-per-page="itemsPerPage" total-items="totalItems" ng-model="currentPage" ng-change="pageChanged()"></ul>

            </div>
        </div>
    `;

    function photoGalleryModal($uibModal, flickrApiService) {
        var service = {
            open: open
        };

        return service;

        ////////////////

        function open(coords) {
            const modalInstance = $uibModal.open({
                animation: true,
                template: modalTemplate,
                size: 'lg',
                controller: photoGalleryModalInstanceController,
                resolve: {
                     syncData: () => coords,
                     asyncData: () => flickrApiService
                }
            });
            return modalInstance;
        }
    }

    function photoGalleryModalInstanceController($scope, $uibModalInstance, syncData, asyncData) {
    	
    	var currentPage = 1;
    	$scope.flickrApiService = asyncData;
        $scope.coords = syncData;
        
        $scope.itemsPerPage = 12;
        $scope.maxSize = 5;

        $scope.callFlickrApi = function(currentPage){
	        $scope.flickrApiService.fetchPhotosByLocationCoords($scope.coords,currentPage,$scope.itemsPerPage)
	        .then($scope.photosResponseSuccess, function(){});
    	}

        $scope.photosResponseSuccess = function(photosResponse){
        	photosResponse = photosResponse.photos
        	$scope.photosArray = photosResponse.photo;
        	$scope.totalItems = parseInt(photosResponse.total);
        	$scope.currentPage = photosResponse.page;
        }

        $scope.constructImageUrl = function(index){

        	if(!$scope.photosArray[index]) return;

        	var photo = $scope.photosArray[index];

        	return 'https://farm' + photo['farm'] + '.staticflickr.com/' + photo['server'] + '/' + photo['id'] + '_' + photo['secret'] + '_m.jpg';
        	
        }

        $scope.pageChanged = function(){
        	$scope.callFlickrApi($scope.currentPage);        	
        }

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $uibModalInstance.result.then(function() {
		}, function() {
		});



        $scope.callFlickrApi(currentPage);
    }
