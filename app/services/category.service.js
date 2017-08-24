(function() {
    'use strcit';

    angular
        .module('app')
        .service('categoryService', categoryService);

    categoryService.$inject = [
        '$http',
        '_',

        'UrlBuilder'

    ];

    function categoryService(
        $http,
        _,


        UrlBuilder
    ) {

        var service = this;

        function getCategoryList() {
            var apiUrl = UrlBuilder.buildApiUrl(['categories']);
            return $http.get(apiUrl);
        }

        //public interface

        service = {
            getCategoryList: getCategoryList,
        };
        return service;
    }
})();
