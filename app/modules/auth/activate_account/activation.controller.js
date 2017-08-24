(function() {

    'use strict';

    angular
        .module('app')
        .controller('activateCtrl', ActivateCtrl);

    ActivateCtrl.$inject = [
        '$state',
        '$scope',
        '$rootScope',

        'resolveActivation',
        'authService',
        'resourceService'
    ];

    function ActivateCtrl(
        $state,
        $scope,
        $rootScope,

        resolveActivation,
        authService,
        resourceService
    ) {
        var vm = this;

        vm.model = {
            token: resolveActivation.token,
            infoBox: {
                content: "",
                isVisible: false,
                class: "error-box"
            },
        };
        activate();

        function activate() {
            authService.activate(vm.model.token)
                .then(onActivationSuccess, onActivationFail);
        }

        function onActivationSuccess(response) {
            vm.model.infoBox.class = "success-box";
            vm.model.infoBox.content = "Aktywacja twojego konta przebiegła prawidłowo , teraz moższ sie zalogowac na swoje konto w systemie EWTK.";
            vm.model.infoBox.isVisible = true;
            setAndGo();
        }

        function onActivationFail(response) {
            var errors = resourceService.getApiErrors(response);
            vm.model.infoBox.class = "error-box";
            vm.model.infoBox.content = "Wystąpił problem podczas aktywacji twojego konta";
            vm.model.infoBox.isVisible = true;
            setAndGo();
        }

        function setAndGo() {
            $rootScope.infoBox = vm.model.infoBox;
            $state.go('logIn');
        }
    }

})();
