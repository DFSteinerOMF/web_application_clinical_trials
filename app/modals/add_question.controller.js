(function() {

    'use strict';

    angular
        .module('app')
        .controller('addQuestionCtrl', AddQuestionCtrl);

    AddQuestionCtrl.$inject = [
        '$uibModalInstance',
        'model',
        '$scope',
        'managePanelService',
        'resourceService'
    ];

    function AddQuestionCtrl(
        $uibModalInstance,
        model,
        $scope,

        managePanelService,
        resourceService
    ) {
        var vm = this;
        vm.model = {
            question: {
                'title': '',
                'description': '',
                'question_type': null,
                'selection_id': null,
                'is_positive': true,
                'is_picture': false,
            },
            infoBox: {
                content: "",
                isVisible: false,
                class: "error-box"
            },
            chosedType: null,
            selectedPool: null,
            poolsList: [],
            questionTypes: [],
            incommingModel: model,
        };

        activate();
        function activate() {
            managePanelService.getQuestionTypes().then(function(response) {
                vm.model.questionTypes = response.data;
            });
            managePanelService.getSelectionsList().then(function(response) {
                vm.model.poolsList = response.data;
            });
        }

        function ok() {
            if ($scope.addForm.$valid) {
                vm.model.question.question_type = vm.model.chosedType;
                if (vm.model.chosedType == 3 || vm.model.chosedType == 4) {
                    vm.model.question.selection_id = vm.model.selectedPool.originalObject.id;
                }
                vm.model.formSubmited = false;
                managePanelService.addQuestionToModule(vm.model.incommingModel.emodule.id,
                    vm.model.question).then(onAddSucces, onAddFail);
            } else {
                vm.model.formSubmited = true;
                $scope.addForm.selectionInput.$setTouched();
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

        function unmarkPool() {
            vm.model.chosedType = null;
            vm.model.selectedPool = null;
        }

        function cancel() {
            $uibModalInstance.close();
        }

        //public interface
        vm.cancel = cancel;
        vm.ok = ok;
        vm.unmarkPool = unmarkPool;
    }

})();
