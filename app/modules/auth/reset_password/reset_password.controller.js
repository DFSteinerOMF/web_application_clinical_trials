(function() {

    'use strict';

    angular
        .module('app')
        .controller('resetPasswordCtrl', ResetPasswordCtrl);

    ResetPasswordCtrl.$inject = [
        '$state',
        '$scope',
        '$rootScope',

        'authService',
        'resourceService',
        'resolveResetPassword'
    ];

    function ResetPasswordCtrl(
        $state,
        $scope,
        $rootScope,

        authService,
        resourceService,
        resolveResetPassword
    ) {
        var vm = this;
        angular.element(document.querySelector('body')).addClass('login-image');

        vm.model = {
            resetPasswordModel: {
                newpassword: '',
                confirmpassword: '',
                token: resolveResetPassword.token
            },
            infoBox: {
                content: "",
                isVisible: false,
                class: "error-box"
            },
            events: {
                formSubmited: false
            }
        };

        function resetPassword() {
            if ($scope.resetPasswordForm.$valid) {
                vm.model.events.formSubmited = false;
                authService.resetPassword(vm.model.resetPasswordModel)
                    .then(onResetSucces, onResetfail);
            } else {
                vm.model.events.formSubmited = true;
            }
        }

        function onResetSucces(response) {
            var infoBox = {
                content: "Twoje hasło zostało zresetowane poprawnie.",
                isVisible: true,
                class: "success-box"
            };
            $rootScope.infoBox = infoBox;
            $state.go('logIn');
        }

        function onResetfail(response) {
            console.log(response);
            var errors = resourceService.getApiErrors(response);
            vm.model.infoBox.class = "error-box";
            vm.model.infoBox.content = errors[0];
            vm.model.infoBox.isVisible = true;
        }
        //public interface
        vm.resetPassword = resetPassword;
    }

})();
