(function() {
    'use strict';
    angular
        .module('app')
        .controller('moduleDetailsCtrl', ModuleDetailsCtrl);

    ModuleDetailsCtrl.$inject = [
        '$state',
        '$scope',
        '$interval',

        'managePanelService',
        'resourceService',
        'modalService',
        'moduleId',
    ];

    function ModuleDetailsCtrl(
        $state,
        $scope,
        $interval,

        managePanelService,
        resourceService,
        modalService,
        moduleId
    ) {
        var vm = this;

        vm.model = {
            module: null,
            searchField: '',
            infoBox: {
                content: "",
                isVisible: false,
                class: "error-box"
            },
            events: {
                formSubmitted: false
            },
        };
        activate();

        function activate() {
            managePanelService.getDetailsOfModule(moduleId.mid).then(onGetModuleDetails);
        }

        function onGetModuleDetails(response) {
            vm.model.module = response.data;
        }

        function onOperationSucces(response) {
            managePanelService.getDetailsOfModule(moduleId.mid).then(onGetModuleDetails);
            vm.model.infoBox.class = "success-box";
            vm.model.infoBox.content = "Pytanie dodano pomyślnie";
            vm.model.infoBox.isVisible = true;

        }

        function showAddQuestionModal(module) {
            var toModal = {
                emodule: module,
                succesCallback: onOperationSucces,
            };
            modalService.showModal(toModal, 'addQuestion');
        }

        function showScaleRadioModal(sid) {
            var toModal = {
                selection_id: sid
            };
            modalService.showModal(toModal, 'showScaleRadio');
        }

        //public interfaces
        vm.showAddQuestionModal = showAddQuestionModal;
        vm.showScaleRadioModal = showScaleRadioModal;
    }
})();
