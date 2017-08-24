(function() {

    'use strict';

    angular
        .module('app')
        .controller('addDiseaseCtrl', AddDiseaseCtrl);

    AddDiseaseCtrl.$inject = [
        '$uibModalInstance',
        'model',
        '$scope',
        'managePanelService',
        'resourceService'
    ];

    function AddDiseaseCtrl(
        $uibModalInstance,
        model,
        $scope,

        managePanelService,
        resourceService
    ) {
        var vm = this;
        vm.model = {
            disease: {
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
                managePanelService.addDisease(vm.model.disease).then(onAddSucces, onAddFail);
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
