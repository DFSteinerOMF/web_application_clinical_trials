(function() {
    'use strcit';

    angular
        .module('app')
        .service('attachmentsService', attachmentsService);

    attachmentsService.$inject = [
        '$http',
        '_',

        'UrlBuilder'

    ];

    function attachmentsService(
        $http,
        _,

        UrlBuilder
    ) {

        var service = this;

        function upLoadAttachment(file) {
            var url = UrlBuilder.buildApiUrl(['upload']);
            var fd = new FormData();
            fd.append("file", file);
            console.log('file', file);
            return $http.post(url, fd, {
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            });
        }


        //public interface
        service = {
            upLoadAttachment: upLoadAttachment,
        };
        return service;
    }
})();
