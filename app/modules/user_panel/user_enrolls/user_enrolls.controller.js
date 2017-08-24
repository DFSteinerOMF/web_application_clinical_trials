(function() {
    'use strict';
    angular
        .module('app')
        .controller('userEnrolls', UserEnrolls);

    UserEnrolls.$inject = [
        '$log',
        '$state',

        'authService',
        'resourceService',
        'studyService'
    ];

    function UserEnrolls(
        $log,
        $state,

        authService,
        resourceService,
        studyService
    ) {
        var vm = this;
        vm.model = {

            userInquiriesList: {
                per_page: 1,
                current_page: 1,
                next_page_url: "http://localhost:8000/api/my-enrollments?page=2",
                prev_page_url: null,
                from: 1,
                to: 1,
                data: [{
                    id: 3,
                    is_accepted: 0,
                    is_rejected: 0,
                    inquiry_id: 1,
                    user_id: 3,
                    inquiry: {
                        id: 1,
                        name: "Badanie nr.1",
                        description: "",
                        startSingUpDate: "",
                        endSingUpDate: "",
                        startDate: "",
                        endDate: "",
                        is_active: 0,
                        is_enrollment_open: 1,
                        is_visible: 1,
                        created_at: null,
                        updated_at: null
                    }
                }]
            },
            infoBox: {
                msg: "",
                isVisible: false,
                class: "error-box"
            }
        };
        activate();

        function activate() {
            studyService.getAllLoggedUserInquiries().then(onGetActivate);
        }

        function onGetActivate(response) {
            vm.model.userInquiriesList = response.data;
            console.log(vm.model.userInquiriesList.data);

        }

        function removeEnrollmentFromInquiry(id) {
            studyService.removeUserEnrollment(id).then(onRemoveSuccess, onRemoveFail);
        }

        function onRemoveSuccess() {
            vm.model.infoBox.msg = "Wypisano się pomyślnie";
            vm.model.infoBox.class = "success-box";
            vm.model.infoBox.isVisible = true;
            studyService.getAllLoggedUserInquiries().then(onGetActivate);

        }

        function onRemoveFail() {
            console.log(resourceService.getApiErrors(response));
            var errors = resourceService.getApiErrors(response);
            vm.model.infoBox.class = "error-box";
            vm.model.infoBox.msg = errors[0];
            vm.model.infoBox.isVisible = true;
        }

        vm.removeEnrollmentFromInquiry = removeEnrollmentFromInquiry;
    }
})();
