(function() {
    'use strict';
    angular
        .module('app')
        .controller('addictionsCtrl', AddictionsCtrl);

    AddictionsCtrl.$inject = [
        '$state',
        '$scope',
        '$interval',

        'managePanelService',
        'resourceService',
        'modalService'
    ];

    function AddictionsCtrl(
        $state,
        $scope,
        $interval,

        managePanelService,
        resourceService,
        modalService
    ) {
        var vm = this;
        vm.model = {
            addictionsList: [],
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
            managePanelService.getAddictionsList().then(onGetAddictions);
        }

        function onGetAddictions(response) {
            vm.model.addictionsList = response.data;
        }

        function onAddSucces(response) {
            vm.model.infoBox.class = "success-box";
            vm.model.infoBox.content = "Dodano pomyślnie";
            vm.model.infoBox.isVisible = true;
            managePanelService.getAddictionsList().then(onGetAddictions);
        }

        function deleteAddiction(addiction) {
            managePanelService.deleteAddiction(addiction).then(onDeleteSucces, onDeleteFail);
        }

        function onDeleteSucces(response) {
            vm.model.infoBox.class = "success-box";
            vm.model.infoBox.content = "Usunięto pomyślnie";
            vm.model.infoBox.isVisible = true;
            managePanelService.getAddictionsList().then(onGetAddictions);
        }

        function onDeleteFail(response) {
            var errors = resourceService.getApiErrors(response);
            vm.model.infoBox.class = "error-box";
            vm.model.infoBox.content = errors[0];
            vm.model.infoBox.isVisible = true;
        }

        function showModal() {
            var toModal={
                succesCallback:onAddSucces,
            };
            modalService.showModal(toModal, 'addAddiction');
        }


        //public interfaces
        vm.deleteAddiction = deleteAddiction;
        vm.showModal = showModal;
    }
})();
