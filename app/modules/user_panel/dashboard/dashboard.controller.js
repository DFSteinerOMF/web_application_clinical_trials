(function() {
    'use strict';
    angular
        .module('app')
        .controller('dashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = [
        '$log',
        '$state',

        'authService',
        'resourceService',
        'studyService',
        'modalService'
    ];

    function DashboardCtrl(
        $log,
        $state,

        authService,
        resourceService,
        studyService,
        modalService
    ) {
        var vm = this;
        vm.model = {
            category: "",
            studyList: "",
            infoBox: {
                msg: "",
                isVisible: false,
                class: "error-box"
            }
        };
        activate();

        function activate() {
            if(resourceService.getCurrentLogedUser().is_profile_filled == 0){
                showAddProfileModal();
            }
            else{
                studyService.getStudyList().then(onGetSudy);
            } 
        }

        function onGetSudy(response) {
            vm.model.studyList = response.data;
            console.log(vm.model.studyList);
        }

        function enroll(inquiry) {
            studyService.enrollToInquiry(inquiry).then(onEnrollSucess, onEnrollFail);
        }

        function onEnrollSucess(response) {
            vm.model.infoBox.class = "success-box";
            vm.model.infoBox.msg = "Zapisano pomyślnie";
            vm.model.infoBox.isVisible = true;
            studyService.getStudyList().then(onGetSudy);           
        }

        function onEnrollFail(response) {
            var errors = resourceService.getApiErrors(response);
            vm.model.infoBox.msg=errors[0];
            vm.model.infoBox.isVisible = true;
            vm.model.infoBox.class = 'error-box';
        }

        function showAddProfileModal() {
            modalService.showModal(null, 'addProfile');
        }

        vm.enroll = enroll;
    }
})();
