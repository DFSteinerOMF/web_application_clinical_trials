(function() {
    'use strict';
    angular
        .module('app')
        .controller('userProfileNavigationCtrl', UserProfileNavigationCtrl);

    UserProfileNavigationCtrl.$inject = [
        '$log',
        '$state',
        '$scope',

        'authService',
        'resourceService',
        'categoryService',
        'modalService'
    ];

    function UserProfileNavigationCtrl(
        $log,
        $state,
        $scope,

        authService,
        resourceService,
        categoryService,
        modalService
    ) {
        var vm = this;
        vm.model = {
            userName: '',
            alphabet: []
        };
        activate();

        function activate() {
            var str = "ABCĆDEĘFGHIJKLŁMNOÓPQRSTUVWXYZŻŹ";
            for (var i = 0; i < 32; i++) {
                vm.model.alphabet.push(str.charAt(i));
            }
            vm.model.userName = resourceService.getCurrentLogedUser().name + " " + resourceService.getCurrentLogedUser().surname;
        }

        function toggleSidebar() {
            $scope.toggle = !$scope.toggle;
        }

        function logout() {
            authService.logOutFromAllDevices();
            $state.go('logIn');
        }

        //public interfaces
        vm.logout = logout;
        vm.toggleSidebar = toggleSidebar;
    }
})();
