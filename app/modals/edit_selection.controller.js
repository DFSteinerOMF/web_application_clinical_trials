(function() {

    'use strict';

    angular
        .module('app')
        .controller('editSelectionCtrl', EditSelectionCtrl);

    EditSelectionCtrl.$inject = [
        '$uibModalInstance',
        'model',
        '$scope',
        'managePanelService',
        'resourceService'
    ];

    function EditSelectionCtrl(
        $uibModalInstance,
        model,
        $scope,

        managePanelService,
        resourceService
    ) {
        var vm = this;
        vm.model = {
            selection: {
                'id': model.modelToEdit.id,
                'name': model.modelToEdit.name,
                'description': model.modelToEdit.description,
                answers: model.modelToEdit.selection_answers
            },
            selectionAnswer: {
                'answer': '',
                'value': '',
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
                var toApiModel = {
                    answer: vm.model.selectionAnswer.answer,
                    value: vm.model.selectionAnswer.value,
                };
                managePanelService.addSelectionAnswer(toApiModel, vm.model.selection.id).then(onSuccesAnswer, onAddFail);
                reloadDetailsOfSelection();
                vm.model.selectionAnswer.answer = '';
                vm.model.selectionAnswer.value = '';
            } else {
                vm.model.answerFormSubmited = true;
            }
        }

        function removeAnswer(model) {
            managePanelService.deleteSelectionAnswer(vm.model.selection.id, vm.model.selection.answers[(vm.model.selection.answers.indexOf(model), 1)].id).then(onSuccesAnswer, onAddFail);
            reloadDetailsOfSelection();
        }

        function reloadDetailsOfSelection() {
            managePanelService.getSelectionDetails(vm.model.selection.id).then(function(response) {
                vm.model.selection.answers = response.data.selection_answers;
            });
        }


        function ok() {
            if ($scope.addForm.$valid) {
                vm.model.formSubmited = false;
                managePanelService.updateSelection(vm.model.selection).then(onAddSuccesCallback, onAddFail);
            } else {
                vm.model.formSubmited = true;
            }

            function onAddSuccesCallback(response) {
                vm.model.incommingModel.succesCallback(response);
                $uibModalInstance.close();
            }
        }

        function cancel() {
            vm.model.incommingModel.cancelCallback();
            $uibModalInstance.close();
        }

        function onAddFail(response) {
            var errors = resourceService.getApiErrors(response);
            vm.model.infoBox.class = "error-box";
            vm.model.infoBox.content = errors[0];
            vm.model.infoBox.isVisible = true;
        }

        function onSuccesAnswer(response) {
            vm.model.infoBox.class = "success-box";
            vm.model.infoBox.content = 'Operacja przebiegła pomyslnie';
            vm.model.infoBox.isVisible = true;
        }


        //public interface
        vm.cancel = cancel;
        vm.ok = ok;
        vm.addNewAnswerToSelection = addNewAnswerToSelection;
        vm.removeAnswer = removeAnswer;
    }

})();
