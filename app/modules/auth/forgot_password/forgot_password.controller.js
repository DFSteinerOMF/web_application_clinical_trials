(function() {

    'use strict';

    angular
        .module('app')
        .controller('forgotPasswordCtrl', ForgotPasswordCtrl);

    ForgotPasswordCtrl.$inject = [
        '$state',
        '$scope',
        '$rootScope',

        'authService',
        'resourceService'
    ];

    function ForgotPasswordCtrl(
        $state,
        $scope,
        $rootScope,

        authService,
        resourceService
    ) {
        var vm = this;
        angular.element(document.querySelector('body')).addClass('login-image');

        vm.model = {
            email: '',
            infoBox: {
                content: "",
                isVisible: false,
                class: "error-box"
            },
            events: {
                formSubmited: false
            }
        };

        function forgotPassword() {
            if ($scope.forgotPasswordForm.$valid) {
                vm.model.events.formSubmited = false;
                authService.forgotPassword(vm.model.email)
                    .then(onForgotSucces, onForgotFail);
            } else {
                vm.model.events.formSubmited = true;
            }
        }

        function onForgotSucces(response) {
            var infoBox = {
                content: "Link do zresetowania hasła został wysłany na podany email.",
                isVisible: true,
                class: "success-box"
            };
            $rootScope.infoBox = infoBox;
            $state.go('logIn');
        }

        function onForgotFail(response) {
            var errors = resourceService.getApiErrors(response);
            vm.model.infoBox.class = "error-box";
            vm.model.infoBox.content = errors[0];
            vm.model.infoBox.isVisible = true;
        }
        //public interface
        vm.forgotPassword = forgotPassword;
    }

})();
