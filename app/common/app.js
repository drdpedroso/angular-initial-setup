(function () {
  'use strict';

  var app = angular.module('angular-mdl-skeleton', ['ui.router']);

  app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
          url: '/home',
          templateUrl: '../modules/example/views/example.html'
      });

  });
}());
