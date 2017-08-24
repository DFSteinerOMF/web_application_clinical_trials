(function() {

    'use strict';

    angular
        .module('app')
        .controller('addGroupCtrl', AddGroupCtrl);

    AddGroupCtrl.$inject = [
        '$uibModalInstance',
        'model',
        '$scope',
        'managePanelService',
        'resourceService'
    ];

    function AddGroupCtrl(
        $uibModalInstance,
        model,
        $scope,

        managePanelService,
        resourceService
    ) {
        var vm = this;
        vm.model = {
            group: {
                'name': '',
                'more_info': '',
            },
            infoBox: {
                content: "",
                isVisible: false,
                class: "error-box"
            },
            formSubmited: false,
            incommingModel: model,

        };

        function ok() {
            if ($scope.addForm.$valid) {
                vm.model.formSubmited = false;
                managePanelService.addGroupToInquiry(vm.model.incommingModel.einquiry.id,vm.model.group).then(onAddSucces, onAddFail);
            } else {
                vm.model.formSubmited = true;
            }

            function onAddSucces(response) {
                vm.model.incommingModel.succesCallback(response);
                $uibModalInstance.close();

            }
            function onAddFail(response) {
                var errors = resourceService.getApiErrors(response);
                vm.model.infoBox.class = "error-box";
                vm.model.infoBox.content = errors[0];
                vm.model.infoBox.isVisible = true;
            }

        }

        function cancel() {
            $uibModalInstance.close();
        }

        //public interface
        vm.cancel = cancel;
        vm.ok = ok;
    }

})();
