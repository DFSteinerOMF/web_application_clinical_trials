(function() {

    'use strict';

    angular
        .module('app')
        .controller('logInCtrl', LogInCtrl);

    LogInCtrl.$inject = [
        '$state',
        '$scope',
        '$rootScope',
        '_',

        'authService',
        'resourceService'
    ];

    function LogInCtrl(
        $state,
        $scope,
        $rootScope,
        _,

        authService,
        resourceService
    ) {
        var vm = this;
        angular.element(document.querySelector('body')).addClass('login-image');

        vm.model = {
            credencials: {
                username: '',
                password: ''
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
        activate();

        function activate() {
            if (!_.isUndefined($rootScope.infoBox)) {
                vm.model.infoBox = $rootScope.infoBox;                
                $rootScope.infoBox = null;
            }
        }

        function login(credencials) {
            if ($scope.loginForm.$valid) {
                vm.model.events.formSubmited = false;
                authService.logIn(credencials)
                    .then(onLoginResponse, onLoginFailResponse);
            } else {
                vm.model.events.formSubmited = true;
            }

        }

        function onLoginResponse(response) {
            switch (resourceService.getCurrentLogedUser().role.name) {
                case "admin":
                    $state.go('adminNavbar.adminDashboard');
                    break;
                case "doctor":
                    $state.go('adminNavbar.adminDashboard');
                    break;
                case "user":
                    $state.go('userProfileNavbar.dashboard');
                    break;
            }
        }

        function onLoginFailResponse(response) {            
            var errors = resourceService.getApiErrors(response);
            vm.model.infoBox.class = "error-box";
            vm.model.infoBox.content = errors[0];
            vm.model.infoBox.isVisible = true;
            vm.model.credencials.password = null;
        }

        //public interface
        vm.login = login;
    }

})();
