(function() {

    'use strict';

    angular
        .module('app')
        .controller('showRadioScale', ShowRadioScale);

    ShowRadioScale.$inject = [
        '$uibModalInstance',
        'model',
        '$scope',
        'managePanelService',
        'resourceService'
    ];

    function ShowRadioScale(
        $uibModalInstance,
        model,
        $scope,

        managePanelService,
        resourceService
    ) {
        var vm = this;
        vm.model = {
            incommingModel: model,
            selection: null
        };

        activate();
        function activate() {
            managePanelService.getSelectionDetails(vm.model.incommingModel.selection_id).then(function(response) {
                vm.model.selection = response.data;
            });
        }

        function cancel() {
            $uibModalInstance.close();
        }

        //public interface
        vm.cancel = cancel;
    }

})();
