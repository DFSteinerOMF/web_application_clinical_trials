(function() {
    'use strcit';

    angular
        .module('app')
        .factory('authService', authService);

    authService.$inject = [
        '$cookies',
        'store',
        '$http',
        '$log',
        '$rootScope',
        '_',

        'config',
        'UrlBuilder',
        'resourceService'

    ];

    function authService(
        $cookies,
        store,
        $http,
        $log,
        $rootScope,
        _,

        config,
        UrlBuilder,
        resourceService
    ) {

        var basicLoginUrl = UrlBuilder.buildApiUrl(['auth', 'login']);
        var tokenUrl = UrlBuilder.buildApiUrl(['auth', 'access-token']);

        function setBearer(token) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }

        function isDateGreaterThan(now, expirationDate) {
            return (Date.parse(now) > Date.parse(expirationDate)) ? true : false;
        }

        function isTokenExpired() {
            var Authorization_Data = store.get('Authorization_Data');
            var expirationDateCookie = Authorization_Data.expiration_date,
                expirationDate = new Date(expirationDateCookie),
                now = new Date().toString(),
                isDateExpired = isDateGreaterThan(now, expirationDate);
            return isDateExpired;
        }

        function isTokenExists(accessToken) {
            return accessToken !== '' &&
                typeof accessToken === 'string' &&
                accessToken.length === 40;
        }

        function getAccessToken() {
            var Authorization_Data = store.get('Authorization_Data');
            if (isTokenExists(Authorization_Data.access_token)) {
                if (!isTokenExpired()) {
                    setBearer(Authorization_Data.access_token);
                } else {
                    store.remove('Authorization_Data');
                    $state.go('logIn');
                }
                //if token expired log outt TO DOOOOOOO
            } else {
                //use refresh token intead to regenerate access_token TOOO DOOOO
            }
        }

        ///////////////LOGIN STEPS/////////////////////////
        function logIn(credentials) {
            var credencialsObject = {
                "email": credentials.username,
                "password": credentials.password
            };
            return $http.post(basicLoginUrl, credencialsObject)
                .then(onApiBasicLoginSucces)
                .then(tryToGetAccessToken.bind(tryToGetAccessToken, credentials))
                .then(onGetAccessTokenSuccess);
        }

        function onApiBasicLoginSucces(response) {
            return response;
        }

        function tryToGetAccessToken(credentials, response) {
            store.set('userLoggedData', response.data);
            var data = {
                "grant_type": "password",
                "username": credentials.username,
                "password": credentials.password,
                "client_id": 'test',
                "client_secret": 'test'
            };
            return $http.post(tokenUrl, data);
        }

        function onGetAccessTokenSuccess(response) {
            var expirationDate = new Date();
            expirationDate.setSeconds(expirationDate.getSeconds() + response.data.expires_in);
            var Authorization_Data = {
                'access_token': response.data.access_token,
                'refresh_token': response.data.refresh_token,
                'expiration_date': expirationDate
            };
            store.set('Authorization_Data', Authorization_Data);
            setBearer(response.data.access_token);
            return response;
        }
        ////////////////////////////////////////////////////////////////////////

        function isLoggedInCookies() {
            if ($http.defaults.headers.common.Authorization) {
                return true;
            } else {
                var Authorization_Data = store.get('Authorization_Data');
                if (!_.isNull(Authorization_Data)) {
                    if (isTokenExists(Authorization_Data.access_token)) {
                        if (!isTokenExpired(Authorization_Data.access_token)) {
                            setBearer(Authorization_Data.access_token);
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        function isAnnonymus() {
            if (!isLoggedInCookies()) {
                return true;
            } else {
                return false;
            }
        }

        function isUserLogIn() {
            if (isLoggedInCookies()) {
                switch (store.get('userLoggedData').role.name) {
                    case "user":
                        return true;
                    default:
                        return false;
                }
            } else {
                return false;
            }
        }

        function isAdminOrDoctorLogin() {
            if (isLoggedInCookies()) {
                switch (store.get('userLoggedData').role.name) {
                    case "admin":
                        return true;
                    case "doctor":
                        return true;
                    default:
                        return false;
                }
            } else {
                return false;
            }
        }

        function logOutFromAllDevices() {
            resourceService.clearUserData();
            delete $http.defaults.headers.common.Authorization;
            store.remove('Authorization_Data');
            store.remove('userLoggedData');
        }

        function register(model) {
            var apiUrl = UrlBuilder.buildApiUrl(['register', 'user']);
            return $http.post(apiUrl, model);
        }

        function activate(token) {
            var apiUrl = UrlBuilder.buildApiUrl(['register', 'activate', token]);
            return $http.post(apiUrl);
        }

        function forgotPassword(email) {
            var model = {
                email: email
            };
            var apiUrl = UrlBuilder.buildApiUrl(['register', 'forgot-password']);
            return $http.post(apiUrl, model);
        }

        function resetPassword(model) {
            var apiUrl = UrlBuilder.buildApiUrl(['register', 'reset-password']);
            return $http.post(apiUrl, model);
        }

        var service = {
            getAccessToken: getAccessToken,
            logIn: logIn,
            register: register,
            activate: activate,
            forgotPassword: forgotPassword,
            resetPassword: resetPassword,
            isAnnonymus: isAnnonymus,
            isUserLogIn: isUserLogIn,
            logOutFromAllDevices: logOutFromAllDevices,
            isAdminOrDoctorLogin: isAdminOrDoctorLogin
        };
        return service;
    }
})();
