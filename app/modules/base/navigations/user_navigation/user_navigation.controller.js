(function() {
    'use strict';
    angular
        .module('app')
        .controller('userNavigationCtrl', UserNavigationCtrl);

    UserNavigationCtrl.$inject = [
        '$log',
        '$state',
        '$scope',

        'authService',
        'resourceService',
        'categoryService',
        'modalService'
    ];

    function UserNavigationCtrl(
        $log,
        $state,
        $scope,

        authService,
        resourceService,
        categoryService,
        modalService
    ) {
        var vm = this;
        vm.model = {
            categoryList: [],
            userName: '',
            alphabet: []
        };
        activate();

        function activate() {
            var str = "ABCĆDEĘFGHIJKLŁMNOÓPQRSTUVWXYZŻŹ";
            for (var i = 0; i < 32; i++) {
                vm.model.alphabet.push(str.charAt(i));
            }
            vm.model.userName = resourceService.getCurrentLogedUser().name + " " + resourceService.getCurrentLogedUser().surname;
            if(resourceService.getCurrentLogedUser().is_profile_filled === 0){
                showAddProfileModal();
            }
            categoryService.getCategoryList().then(onGetDiseases);
        }

        function onGetDiseases(response) {
            vm.model.categoryList = response.data;
        }

        function logout() {
            authService.logOutFromAllDevices();
            $state.go('logIn');
        }

        function goProfile(){
            $state.go('userProfileNavbar.showUserModules');
        }

        function goEditProfile(){
            $state.go('userProfileNavbar.editUserProfile');
        }

        function goUserEnrolls(){
            $state.go('userProfileNavbar.showUserEnrolls');
        }

        function checkNumberOfStartingLetter(letter){
            var numberOfCategories = 0;
            for (var i = 0; i < vm.model.categoryList.length; i++) {
                if (vm.model.categoryList[i].label.substring(0, 1) == letter || vm.model.categoryList[i].label.substring(0, 1) == letter.toLowerCase()) {
                    numberOfCategories++;
                }
            }
            if (numberOfCategories !== 0) {
                return true;
            } else {
                return false;
            }
        }

        function showAddProfileModal() {
            modalService.showModal(null, 'addProfile');
        }
        //public interfaces
        vm.goProfile = goProfile;
        vm.goEditProfile = goEditProfile;
        vm.goUserEnrolls = goUserEnrolls;
        vm.checkNumberOfStartingLetter = checkNumberOfStartingLetter;
        vm.logout = logout;
    }
})();
