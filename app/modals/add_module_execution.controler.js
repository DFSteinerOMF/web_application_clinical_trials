(function() {

    'use strict';

    angular
        .module('app')
        .controller('addModuleExecution', AddModuleExecution);

    AddModuleExecution.$inject = [
        '$uibModalInstance',
        'model',
        '$scope',
        'managePanelService',
        'resourceService'
    ];

    function AddModuleExecution(
        $uibModalInstance,
        model,
        $scope,

        managePanelService,
        resourceService
    ) {
        var vm = this;
        vm.model = {
            execution: {
                'title': '',
                'description': '',
                'day_of_week': '',
                'executionTime': ''
            },
            infoBox: {
                content: "",
                isVisible: false,
                class: "error-box"
            },
            formSubmited: false,
            incommingModel: model,
            executionTime:'',

        };
        console.log('aaaa', model);

        function ok() {
            if ($scope.addForm.$valid) {
                vm.model.formSubmited = false;
                var s = vm.model.executionTime.getHours() + ':' + vm.model.executionTime.getMinutes();
                vm.model.execution.executionTime=s;
                console.log(s);

                managePanelService.addExecutionToModuleInquiry(vm.model.incommingModel.inquiryid, vm.model.incommingModel.moduleid, vm.model.execution).then(onAddSucces, onAddFail);
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
