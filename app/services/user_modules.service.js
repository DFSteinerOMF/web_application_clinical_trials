(function() {
    'use strcit';

    angular
        .module('app')
        .service('userModulesService', userModulesService);

    userModulesService.$inject = [
        '$http',
        '_',

        'UrlBuilder'

    ];

    function userModulesService(
        $http,
        _,


        UrlBuilder
    ) {

        var service = this;

        function getModulesList(model) {
            var apiUrl = UrlBuilder.buildApiUrl(['inquiries', model, 'modules']);
            return $http.get(apiUrl);
        }

        //public interface

        service = {
            getModulesList: getModulesList,
        };
        return service;
    }
})();
