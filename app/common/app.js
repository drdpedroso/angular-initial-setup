(function () {
  'use strict';

  var app = angular.module('angular-mdl-skeleton', ['ui.router']);

  app.config(function($stateProvider) {

    $stateProvider
      .state('example',{
        url: '/',
        views: {
          'content': {
            templateUrl: './modules/example/views/example.html'
          }
        }
      });

  });
}());
