(function() {

    'use strict';

    angular
        .module('app')
        .controller('showUsersAnswers', ShowUsersAnswers);

    ShowUsersAnswers.$inject = [
        '$uibModalInstance',
        'model',
        '$scope',

        'managePanelService'
    ];

    function ShowUsersAnswers(
        $uibModalInstance,
        model,
        $scope,

        managePanelService
    ) {
        var vm = this;
        vm.model = {
            incommingModel: model,
            actualModule: null,
            actualAnswers:null
        };

        function onSelectChange() {
            managePanelService.getUsersAnswersForModule(model.euser.id,
                model.einquiry.id, vm.model.actualModule).then(function(response) {
                    vm.model.actualAnswers=response.data;
            });
        }

        function cancel() {
            $uibModalInstance.close();
        }

        //public interface
        vm.cancel = cancel;
        vm.onSelectChange = onSelectChange;
    }

})();
