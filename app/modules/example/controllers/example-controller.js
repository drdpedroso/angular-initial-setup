(function () {
  'use strict';

  function exampleController($state){
      let self = this;

      this.test = 'dasdassdaasdasdsadsdasad';

  }

  exampleController.$inject = ['$state'];

  angular.module('angular-mdl-skeleton').controller('ExampleController', exampleController);
}());
