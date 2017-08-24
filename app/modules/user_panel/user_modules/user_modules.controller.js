(function() {
    'use strict';
    angular
        .module('app')
        .controller('userModules', UserModules);

    UserModules.$inject = [
        '$log',
        '$state',

        'authService',
        'resourceService',
        'userModulesService'
    ];

    function UserModules(
        $log,
        $state,

        authService,
        resourceService,
        userModulesService
    ) {
        var vm = this;
        vm.model = {
            modulesList: [{
                id: 1,
                name: "Modul nr.1",
                created_at: null,
                updated_at: null,
                module_execution: [{
                    id: 6,
                    title: "testowe wykonanie sobota",
                    description: "opis testowego wykonania1 sobota",
                    day_of_week: 6,
                    executionTime: "23:30:00"
                }]
            }, {
                id: 2,
                name: "Modul nr.2",
                created_at: null,
                updated_at: null,
                module_execution: []
            }],
            infoBox: {
                msg: "",
                isVisible: false,
                class: "error-box"
            }
        };
        activate();

        function activate() {
            userModulesService.getModulesList(resourceService.getCurrentLogedUser().active_inquiry_id).then(onGetModules);
        }

        function onGetModules(response) {
            vm.model.modulesList = response.data;
        }

        function goQuestions(moduleId, moduleExcutionId){
            console.log(moduleExcutionId);
            
            
            $state.go('userProfileNavbar.showQuestions',{mid: moduleId, meid: moduleExcutionId});
        }

        vm.goQuestions = goQuestions;
    }
})();
