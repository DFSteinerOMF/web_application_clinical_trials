(function() {
    'use strict';
    angular
        .module('app')
        .controller('inquiryDetailsCtrl', InquiryDetailsCtrl);

    InquiryDetailsCtrl.$inject = [
        '$state',
        '$scope',
        '$interval',

        'managePanelService',
        'resourceService',
        'modalService',
        'inquiryId',
    ];

    function InquiryDetailsCtrl(
        $state,
        $scope,
        $interval,

        managePanelService,
        resourceService,
        modalService,
        inquiryId
    ) {
        var vm = this;

        vm.model = {
            inquiry: null,
            selectedModule: null,
            infoBox: {
                content: "",
                isVisible: false,
                class: "error-box"
            },
        };
        activate();

        function activate() {
            managePanelService.getInquiryDetailsForAdmin(inquiryId.iid).then(onGetInquiryDetails);
        }

        function onGetInquiryDetails(response) {
            vm.model.inquiry = response.data;
        }

        function onOperationSucces(response) {
            vm.model.selectedModule = null;
            managePanelService.getInquiryDetailsForAdmin(inquiryId.iid).then(onGetInquiryDetails);
            vm.model.infoBox.class = "success-box";
            vm.model.infoBox.content = "Operacja wykonana pomyślnie";
            vm.model.infoBox.isVisible = true;
        }

        function showAddGroupModal(inquiry) {
            var toModal = {
                einquiry: inquiry,
                succesCallback: onOperationSucces,
            };
            modalService.showModal(toModal, 'addGroup');
        }

        function showacceptEnrollmentModal(user) {
            var toModal = {
                egroup: vm.model.inquiry.groups_with_users,
                inquiryid: vm.model.inquiry.id,
                choseduser: user,
                succesCallback: onOperationSucces,
            };
            modalService.showModal(toModal, 'acceptUserEnrollment');
        }



        function showAllUsersGroup(users) {
            var toModal = {
                eusers: users,
                showUserAnswersModal:showAnswersModalCalback
            };
            modalService.showModal(toModal, 'showUserGroup');
        }

        function shorAddUserToGroup(group) {
            var toModal = {
                egroup: group,
                inquiryid: vm.model.inquiry.id,
                succesCallback: onOperationSucces
            };
            modalService.showModal(toModal, 'addUserToGroup');
        }

        function showAddModuleExecution() {
            var toModal = {
                moduleid: vm.model.selectedModule.id,
                inquiryid: vm.model.inquiry.id,
                succesCallback: onOperationSucces
            };
            modalService.showModal(toModal, 'addModuleExecution');
        }

        function showScaleRadioModal(sid) {
            var toModal = {
                selection_id: sid
            };
            modalService.showModal(toModal, 'showScaleRadio');
        }

        function rejectUserEnrollment(user) {
            managePanelService.rejectUserEnrolment(user.id, vm.model.inquiry.id).then(onOperationSucces, failToRejectUser);
            function failToRejectUser(response) {
                var errors = resourceService.getApiErrors(response);
                vm.model.infoBox.class = "error-box";
                vm.model.infoBox.content = errors[0];
                vm.model.infoBox.isVisible = true;
            }
        }

        function search(selected) {
            if (!_.isUndefined(selected)) {
                vm.model.selectedModule = selected.originalObject;
            } else {
                vm.model.selectedModule = null;
            }
        }

        function showAnswersModalCalback(user){
            var toModal = {
                euser: user,
                einquiry:vm.model.inquiry
            };
            modalService.showModal(toModal, 'showUserAnswerModal');
        }

        //public interfaces
        vm.showAddGroupModal = showAddGroupModal;
        vm.showScaleRadioModal = showScaleRadioModal;
        vm.showAllUsersGroup = showAllUsersGroup;
        vm.shorAddUserToGroup = shorAddUserToGroup;
        vm.showAddModuleExecution = showAddModuleExecution;
        vm.search = search;
        vm.showacceptEnrollmentModal = showacceptEnrollmentModal;
        vm.rejectUserEnrollment=rejectUserEnrollment;
    }
})();
