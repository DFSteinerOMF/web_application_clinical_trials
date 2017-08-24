(function() {

    'use strict';

    angular
        .module('app')
        .controller('showUsersGroup', ShowUsersGroup);

    ShowUsersGroup.$inject = [
        '$uibModalInstance',
        'model',
        '$scope'

    ];

    function ShowUsersGroup(
        $uibModalInstance,
        model,
        $scope

    ) {
        var vm = this;
        vm.model = {
            incommingModel: model.eusers,
            incommingCallback:model.showUserAnswersModal,
            searchField:''
        };
        console.log(model.eusers);

        function cancel() {
            $uibModalInstance.close();
        }

        function showUserAnswers(user) {
            vm.model.incommingCallback(user);
        }

        //public interface
        vm.cancel = cancel;
        vm.showUserAnswers=showUserAnswers;
    }

})();
