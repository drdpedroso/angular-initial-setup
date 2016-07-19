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
        })

        .state('details', {
            url: '/home/details',
            controller: 'DetailController as detail',
            templateUrl: '../modules/example/views/details.html',
            params: {
              line : null
            }
        });

    });
}());
