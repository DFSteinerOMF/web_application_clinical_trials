(function() {
    'use strict';
    angular
        .module('app')
        .controller('selectionsCtrl', SelectionsCtrl);

    SelectionsCtrl.$inject = [
        '$state',
        '$scope',
        '$interval',

        'managePanelService',
        'resourceService',
        'modalService'
    ];

    function SelectionsCtrl(
        $state,
        $scope,
        $interval,

        managePanelService,
        resourceService,
        modalService
    ) {
        var vm = this;
        vm.model = {
            selectionsList: [],
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
            managePanelService.getSelectionsList().then(onGetSelectionList);
        }

        function onGetSelectionList(response) {
            vm.model.selectionsList = response.data;
        }

        function onOperationSucces(response) {
            vm.model.infoBox.class = "success-box";
            vm.model.infoBox.content = "Operacja przebiegła pomyślnie";
            vm.model.infoBox.isVisible = true;
            managePanelService.getSelectionsList().then(onGetSelectionList);
        }

        function deleteSelection(selection) {
            managePanelService.deleteSelection(selection).then(onOperationSucces, onDeleteFail);
        }

        function onDeleteFail(response) {
            var errors = resourceService.getApiErrors(response);
            vm.model.infoBox.class = "error-box";
            vm.model.infoBox.content = errors[0];
            vm.model.infoBox.isVisible = true;
        }

        function showAddModal() {
            var toModal = {
                succesCallback: onOperationSucces,
            };
            modalService.showModal(toModal, 'addSelection');
        }

        function showEditModal(model) {
            var toModal = {
                succesCallback: onOperationSucces,
                cancelCallback: activate,
                modelToEdit: model
            };
            modalService.showModal(toModal, 'editSelection');
        }

        function showPreviewModal(sid) {
            var toModal = {
                selection_id: sid
            };
            modalService.showModal(toModal, 'showScaleRadio');
        }

        //public interfaces
        vm.deleteSelection = deleteSelection;
        vm.showAddModal = showAddModal;
        vm.showEditModal = showEditModal;
        vm.showPreviewModal = showPreviewModal;
    }
})();
