(function() {
    'use strcit';

    angular
        .module('app')
        .service('updateProfileService', updateProfileService);

    updateProfileService.$inject = [
        '$http',
        '_',

        'UrlBuilder'

    ];

    function updateProfileService(
        $http,
        _,


        UrlBuilder
    ) {

        var service = this;

        function getDiseases(){
            var apiUrl = UrlBuilder.buildApiUrl(['categories']);
            return $http.get(apiUrl);
        }

        function getAdditictions(){
            var apiUrl = UrlBuilder.buildApiUrl(['diseases']);
            return $http.get(apiUrl);
        }

        function updateProfile(model){
            var apiUrl = UrlBuilder.buildApiUrl(['user', 'user-profile']);
            return $http.put(apiUrl, model);
        }

        function getUserData(){
            console.log("USER-DATA");
            var apiUrl = UrlBuilder.buildApiUrl(['auth', 'user-data']);
            return $http.get(apiUrl);
        }

        function editProfile(model){
            var apiUrl = UrlBuilder.buildApiUrl(['user', 'user-profile']);
            return $http.post(apiUrl, model);
        }

        //public interface

        service = {
            getDiseases: getDiseases,
            getAdditictions: getAdditictions,
            updateProfile: updateProfile,
            getUserData: getUserData,
            editProfile: editProfile
        };
        return service;
    }
})();
