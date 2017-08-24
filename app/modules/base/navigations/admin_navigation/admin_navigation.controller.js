(function() {
    'use strict';
    angular
        .module('app')
        .controller('adminNavigationCtrl', AdminNavigationCtrl);

    AdminNavigationCtrl.$inject = [
        '$log',
        '$state',
        '$scope',

        'authService',
        'resourceService'
    ];

    function AdminNavigationCtrl(
        $log,
        $state,
        $scope,

        authService,
        resourceService
    ) {
        var vm = this;

         function toggleSidebar() {
            $scope.toggle = !$scope.toggle;
        }

        window.onresize = function() {
            $scope.$apply();
        };

        function logout() {
            authService.logOutFromAllDevices();
                $state.go('logIn');
        }
        //public interfaces
        vm.logout = logout;
        vm.toggleSidebar = toggleSidebar;
    }
})();
