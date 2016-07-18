(function () {
  'use strict';

  angular.module('angular-mdl-skeleton', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/home');

      $stateProvider
        .state('home', {
            url: '/home',
            controller: 'ExampleController as example',
            templateUrl: '../modules/example/views/example.html'
        });

    });
}());
