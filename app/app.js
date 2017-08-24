(function() {

    'use strict';

    angular
        .module('app', [
            'ui.router',
            'ui.bootstrap',
            'permission',
            'permission.ui',
            'ngCookies',
            'angular-storage',
            'ngMessages',
            'underscore',
            'angular-loading-bar',
            'ncy-angular-breadcrumb',
            'angucomplete-alt',
            'uiSwitch',
            'angularFileUpload',
            'pusher-angular',
        ]);

    angular
        .module('app')
        .run(run);

    run.$inject = [
        '$q',
        '$state',
        'PermissionStore',
        'UrlBuilder',
        'authService',
        'resourceService'
    ];

    function run(
        $q,
        $state,
        PermissionStore,
        UrlBuilder,
        authService,
        resourceService
    ) {
        PermissionStore
            .definePermission('anonymous', function(stateParams) {
                return authService.isAnnonymus();
            });

        PermissionStore
            .definePermission('user', function(stateParams) {
                return authService.isUserLogIn();
            });
        PermissionStore
            .definePermission('adminDoctor', function(stateParams) {
                return authService.isAdminOrDoctorLogin();
            });
    }
})();
