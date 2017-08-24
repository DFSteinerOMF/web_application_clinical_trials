(function() {

    'use strict';

    angular
        .module('app')
        .controller('registerCtrl', RegisterCtrl);

    RegisterCtrl.$inject = [
        '$state',
        '$scope',
        '$timeout',

        'authService',
        'resourceService'
    ];

    function RegisterCtrl(
        $state,
        $scope,
        $timeout,

        authService,
        resourceService
    ) {
        var vm = this;
        angular.element(document.querySelector('body')).addClass('login-image');

        vm.model = {
            registerObject: {
                name: 'a',
                surname: 'a',
                email: 'test@o2.pl',
                retypeEmail: 'test@o2.pl',
                password: 'test1234',
                retypePassword: 'test1234'
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

        function register() {
            if ($scope.registerForm.$valid) {
                vm.model.events.formSubmited = false;
                authService.register(vm.model.registerObject)
                    .then(onRegisterSuccess, onRegisterFail);
            } else {
                vm.model.events.formSubmited = true;
            }
        }

        function onRegisterSuccess(response) {
            vm.model.infoBox.class = "success-box";
            vm.model.infoBox.content = "Rejestracja przebiegła pomyślnie , zostaniesz automatycznie przekierowany na strone logowania";
            vm.model.infoBox.isVisible = true;
            $timeout(function() {
                $state.go('logIn');
            }, 3000);
        }

        function onRegisterFail(response) {
            var errors = resourceService.getApiErrors(response);            
            vm.model.infoBox.class = "error-box";
            vm.model.infoBox.content = errors[0];
            vm.model.infoBox.isVisible = true;
        }
        //public interface
        vm.register = register;
    }

})();
