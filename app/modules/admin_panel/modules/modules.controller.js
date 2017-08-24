(function() {
    'use strict';
    angular
        .module('app')
        .controller('modulesCtrl', ModulesCtrl);

    ModulesCtrl.$inject = [
        '$state',
        '$scope',
        '$interval',

        'managePanelService',
        'resourceService',
        'modalService'
    ];

    function ModulesCtrl(
        $state,
        $scope,
        $interval,

        managePanelService,
        resourceService,
        modalService
    ) {
        var vm = this;
        vm.model = {
            modulesList: [],
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
            managePanelService.getModulesList().then(onGetModulesList);
        }

        function onGetModulesList(response) {
            vm.model.modulesList = response.data;
        }

        function onOperationSucces(response) {
            vm.model.infoBox.class = "success-box";
            vm.model.infoBox.content = "Operacja przebiegła pomyślnie";
            vm.model.infoBox.isVisible = true;
            managePanelService.getModulesList().then(onGetModulesList);
        }

        function showAddModal() {
            var toModal = {
                succesCallback: onOperationSucces,
            };
            modalService.showModal(toModal, 'addModule');
        }

        //public interfaces
        vm.showAddModal = showAddModal;
    }
})();
