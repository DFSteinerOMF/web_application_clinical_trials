(function() {
    'use strcit';

    angular
        .module('app')
        .service('resourceService', resourceService);

    resourceService.$inject = [
        '$cookies',
        'store',
        '$http',
        '_',

        'config',
        'UrlBuilder'

    ];

    function resourceService(
        $cookies,
        store,
        $http,
        _,


        config,
        UrlBuilder
    ) {

        var service = this;

        service.logedUserData = null;

        function getCurrentLogedUser() {
            return store.get('userLoggedData');
        }

        function clearUserData() {
            service.logedUserData = null;
        }

        function getApiErrors(response) {
            var errorArray = [];
            if (response.data.hasOwnProperty('error') && angular.isString(response.data.error)) {
                errorArray.push(response.data.error);
            } else if (response.data.hasOwnProperty('error')) {
                iterateOverErrors(response.data.error);
            } else if (response.data.hasOwnProperty('errors')) {
                iterateOverErrors(response.data.errors);
            }
            function iterateOverErrors(array) {
                _.each(array, function(err) {
                    _.each(err, function(errorInner) {
                        errorArray.push(errorInner);
                    });
                });
            }
            return errorArray;
        }

        function changeUserFilled(){
            var data = getCurrentLogedUser();
            data.is_profile_filled = 1;
            store.set('userLoggedData', data);
        }

        //public interface
        service.changeUserFilled = changeUserFilled;
        service.getCurrentLogedUser = getCurrentLogedUser;
        service.clearUserData = clearUserData;
        service.getApiErrors = getApiErrors;
        return service;

    }
})();
