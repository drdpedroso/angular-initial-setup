(function () {
    'use strict';

    function detailController($stateParams){
        let self = this;

        self.details = $stateParams.line;
    }

    detailController.$inject = ['$stateParams'];

    angular.module('angular-mdl-skeleton').controller('DetailController', detailController);
}());
