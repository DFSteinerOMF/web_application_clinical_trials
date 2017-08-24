(function() {
    'use strict';
    angular
        .module('app')
        .controller('adminDashboardCtrl', AdminDashboardCtrl);

    AdminDashboardCtrl.$inject = [
        '$log',
        '$state',
        '$scope',

        'authService',
        'resourceService',
        'managePanelService'
    ];

    function AdminDashboardCtrl(
        $log,
        $state,
        $scope,

        authService,
        resourceService,
        managePanelService
    ) {
        var vm = this;

        vm.model = {
            'dashboardModel': null,
        };

        activate();

        function activate() {
            managePanelService.getDashboardAdminData().then(function(response) {
                vm.model.dashboardModel = response.data;
                console.log(response.data);
            });
        }
    }
})();
