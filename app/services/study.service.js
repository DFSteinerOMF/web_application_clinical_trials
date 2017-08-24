(function() {
    'use strcit';

    angular
        .module('app')
        .service('studyService', studyService);

    studyService.$inject = [
        '$http',
        '_',

        'UrlBuilder'

    ];

    function studyService(
        $http,
        _,


        UrlBuilder
    ) {

        var service = this;
        function getStudyList(){
            var apiUrl = UrlBuilder.buildApiUrl(['inquiries']);
            return $http.get(apiUrl);
        }

        function enrollToInquiry(model){
            console.log(model);
            var apiUrl = UrlBuilder.buildApiUrl(['inquiry-enrollment' ,model.id, 'inquiry']);
            return $http.post(apiUrl);   
        }

        function getAllLoggedUserInquiries(){
            var apiUrl = UrlBuilder.buildApiUrl(['user', 'my-enrollments']);
            return  $http.get(apiUrl);
        }

        function removeUserEnrollment(model){
            var apiUrl = UrlBuilder.buildApiUrl(['inquiry-enrollment', model, 'inquiry']);
            return $http.delete(apiUrl);

        }
        //public interface

        service = {
            getStudyList: getStudyList,
            enrollToInquiry: enrollToInquiry,
            getAllLoggedUserInquiries:getAllLoggedUserInquiries,
            removeUserEnrollment: removeUserEnrollment
        };
        return service;
    }
})();
