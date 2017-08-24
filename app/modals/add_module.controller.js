(function() {

    'use strict';

    angular
        .module('app')
        .controller('addModuleCtrl', AddModuleCtrl);

    AddModuleCtrl.$inject = [
        '$uibModalInstance',
        'model',
        '$scope',
        'managePanelService',
        'resourceService'
    ];

    function AddModuleCtrl(
        $uibModalInstance,
        model,
        $scope,

        managePanelService,
        resourceService
    ) {
        var vm = this;
        vm.model = {
            module: {
                'name': '',
                'description': '',
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
                managePanelService.addModule(vm.model.module).then(onAddSucces, onAddFail);
            } else {
                vm.model.formSubmited = true;
            }

            function onAddSucces(response) {
                vm.model.incommingModel.succesCallback(response);
                $uibModalInstance.close();

            }
            function onAddFail(response) {
                console.log(response);
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
