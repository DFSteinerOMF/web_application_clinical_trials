(function() {
    'use strict';
    angular
        .module('app')
        .controller('inquiriesCtrl', InquiriesCtrl);

    InquiriesCtrl.$inject = [
        '$state',
        '$scope',
        '$interval',

        'managePanelService',
        'resourceService',
        'modalService'
    ];


    function InquiriesCtrl(
        $state,
        $scope,
        $interval,

        managePanelService,
        resourceService,
        modalService
    ) {
        var vm = this;
        vm.model = {
            inquiriesList: [],
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
            managePanelService.getInquiriesListForAdminPanel().then(onGetInquiriesList);
        }

        function onGetInquiriesList(response) {
            vm.model.inquiriesList = response.data;
        }

        function onOperationSucces(response) {
            vm.model.infoBox.class = "success-box";
            vm.model.infoBox.content = "Operacja przebiegła pomyślnie";
            vm.model.infoBox.isVisible = true;
            managePanelService.getInquiriesListForAdminPanel().then(onGetInquiriesList);
        }

        function showAddInquiryModal() {
            var toModal = {
                succesCallback: onOperationSucces,
            };
            modalService.showModal(toModal, 'addInquiry');
        }

        function changeFlagNonVisibleInquiry(inquiryId) {
            managePanelService.changeFlagInInquiry(inquiryId, 'no-visible').then(onOperationSucces);
        }

        function changeFlagIsactiveInquiry(inquiryId) {
            managePanelService.changeFlagInInquiry(inquiryId, 'is-active').then(onOperationSucces);
        }

        function changeFlagCloseEnrollmentInquiry(inquiryId) {
            managePanelService.changeFlagInInquiry(inquiryId, 'close-enrollment').then(onOperationSucces);
        }

        //public interfaces
        vm.showAddInquiryModal = showAddInquiryModal;
        vm.changeFlagNonVisibleInquiry = changeFlagNonVisibleInquiry;
        vm.changeFlagIsactiveInquiry = changeFlagIsactiveInquiry;
        vm.changeFlagCloseEnrollmentInquiry = changeFlagCloseEnrollmentInquiry;
    }
})();
