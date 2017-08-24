(function() {

    'use strict';

    angular
        .module('app')
        .controller('addSelectionCtrl', AddSelectionCtrl);

    AddSelectionCtrl.$inject = [
        '$uibModalInstance',
        'model',
        '$scope',
        'managePanelService',
        'resourceService'
    ];

    function AddSelectionCtrl(
        $uibModalInstance,
        model,
        $scope,

        managePanelService,
        resourceService
    ) {
        var vm = this;
        vm.model = {
            selection: {
                'name': '',
                'description': '',
                answers: []
            },
            selectionAnswer: {
                'answer': '',
                'value': ''
            },
            infoBox: {
                content: "",
                isVisible: false,
                class: "error-box"
            },
            formSubmited: false,
            answerFormSubmited: false,
            incommingModel: model,

        };

        function addNewAnswerToSelection() {
            if (vm.model.selectionAnswer.answer !== '' && vm.model.selectionAnswer.value !== '') {
                vm.model.answerFormSubmited = false;
                var newAnswer = {
                    'answer': vm.model.selectionAnswer.answer,
                    'value': vm.model.selectionAnswer.value
                };
                vm.model.selection.answers.push(newAnswer);
                vm.model.selectionAnswer.answer = '';
                vm.model.selectionAnswer.value = '';
            } else {
                vm.model.answerFormSubmited = true;
            }
        }

        function removeAnswer(model) {
            vm.model.selection.answers.splice(vm.model.selection.answers.indexOf(model), 1);
        }

        function ok() {
            if ($scope.addForm.$valid) {
                vm.model.formSubmited = false;
                managePanelService.addSelection(vm.model.selection).then(onAddSucces, onAddFail);
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
        vm.addNewAnswerToSelection = addNewAnswerToSelection;
        vm.removeAnswer = removeAnswer;
    }

})();
