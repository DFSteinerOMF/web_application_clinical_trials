(function() {
    'use strict';
    angular
        .module('app')
        .controller('inquiryCategoryCtrl', InquiryCategoryCtrl);

    InquiryCategoryCtrl.$inject = [
        '$state',
        '$scope',
        '$interval',

        'managePanelService',
        'resourceService',
        'modalService'
    ];

    function InquiryCategoryCtrl(
        $state,
        $scope,
        $interval,

        managePanelService,
        resourceService,
        modalService
    ) {
        var vm = this;
        vm.model = {
            categoriesList: [],
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
            managePanelService.getCategoriesWithCountList().then(onGetDiseases);
        }

        function onGetDiseases(response) {
            vm.model.categoriesList = response.data;
        }

        function onAddSucces(response) {
            vm.model.infoBox.class = "success-box";
            vm.model.infoBox.content = "Dodano pomyślnie";
            vm.model.infoBox.isVisible = true;
            managePanelService.getCategoriesWithCountList().then(onGetDiseases);
        }

        function deleteDisease(model) {
            managePanelService.deleteCategory(model).then(onDeleteSucces, onDeleteFail);
        }

        function onDeleteSucces(response) {
            vm.model.infoBox.class = "success-box";
            vm.model.infoBox.content = "Usunięto pomyślnie";
            vm.model.infoBox.isVisible = true;
            managePanelService.getCategoriesWithCountList().then(onGetDiseases);
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
            modalService.showModal(toModal, 'addCategory');
        }


        //public interfaces
        vm.deleteDisease = deleteDisease;
        vm.showModal = showModal;
    }
})();
