'use strict';

import angular from 'angular';

import modal from 'angular-ui-bootstrap/src/modal';

import pagination from 'angular-ui-bootstrap/src/pagination';

import './flickr-api/flickr-api.module.js';

import './flickr-api/flickr-api.service.js';

import '../../node_modules/ngmap/build/scripts/ng-map.min.js';

import './location-map/location-map.module.js';

import './location-map/location-map.component.js';

import './photo-gallery/photo-gallery.module.js';

import './photo-gallery/photo-gallery.service.js';

import '../style/app.css';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor() {
    this.url = 'https://github.com/preboot/angular-webpack';
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [modal, pagination, 'flickrApi', 'locationMap', 'photoGallery'])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;