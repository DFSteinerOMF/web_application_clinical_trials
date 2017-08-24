(function() {
    'use strict';
    angular
        .module('app')
        .controller('diseasesCtrl', DiseasesCtrl);

    DiseasesCtrl.$inject = [
        '$state',
        '$scope',
        '$interval',

        'managePanelService',
        'resourceService',
        'modalService'
    ];

    function DiseasesCtrl(
        $state,
        $scope,
        $interval,

        managePanelService,
        resourceService,
        modalService
    ) {
        var vm = this;
        vm.model = {
            diseasesList: [],
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
            managePanelService.getDieseasesList().then(onGetDiseases);
        }

        function onGetDiseases(response) {
            vm.model.diseasesList = response.data;
        }

        function onAddSucces(response) {
            vm.model.infoBox.class = "success-box";
            vm.model.infoBox.content = "Dodano pomyślnie";
            vm.model.infoBox.isVisible = true;
            managePanelService.getDieseasesList().then(onGetDiseases);
        }

        function deleteDisease(disease) {
            managePanelService.deleteDisease(disease).then(onDeleteSucces, onDeleteFail);
        }

        function onDeleteSucces(response) {
            vm.model.infoBox.class = "success-box";
            vm.model.infoBox.content = "Usunięto pomyślnie";
            vm.model.infoBox.isVisible = true;
            managePanelService.getDieseasesList().then(onGetDiseases);
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
            modalService.showModal(toModal, 'addDiseases');
        }


        //public interfaces
        vm.deleteDisease = deleteDisease;
        vm.showModal = showModal;
    }
})();
