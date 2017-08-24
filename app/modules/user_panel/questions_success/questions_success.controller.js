(function() {
    'use strict';
    angular
        .module('app')
        .controller('questionSuccessCtrl', QuestionSuccessCtrl);

    QuestionSuccessCtrl.$inject = [
        '$log',
        '$state',

        'authService',
        'resourceService',
        'studyService',
        'modalService'
    ];

    function QuestionSuccessCtrl(
        $log,
        $state,

        authService,
        resourceService,
        studyService,
        modalService
    ) {
        var vm = this;
        vm.model = {
            
        };
        activate();

        function activate() {
        }

        vm.activate = activate;
    }
})();
