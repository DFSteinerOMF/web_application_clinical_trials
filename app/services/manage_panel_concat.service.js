(function() {
    'use strcit';

    angular
        .module('app')
        .service('managePanelService', managePanelService);

    managePanelService.$inject = [
        '$http',
        '_',
        'UrlBuilder'

    ];

    function managePanelService(
        $http,
        _,

        UrlBuilder
    ) {

        var service = this;

        function getDieseasesList() {
            var apiUrl = UrlBuilder.buildApiUrl(['diseases']);
            return $http.get(apiUrl);
        }

        function addDisease(model) {
            var apiUrl = UrlBuilder.buildApiUrl(['diseases']);
            return $http.put(apiUrl, model);
        }

        function deleteDisease(model) {
            var apiUrl = UrlBuilder.buildApiUrl(['diseases', model.id]);
            return $http.delete(apiUrl);
        }

        function getAddictionsList() {
            var apiUrl = UrlBuilder.buildApiUrl(['addictions']);
            return $http.get(apiUrl);
        }

        function addAddiction(model) {
            var apiUrl = UrlBuilder.buildApiUrl(['addictions']);
            return $http.put(apiUrl, model);
        }

        function deleteAddiction(model) {
            var apiUrl = UrlBuilder.buildApiUrl(['addictions', model.id]);
            return $http.delete(apiUrl);
        }

        function getCategoriesWithCountList() {
            var apiUrl = UrlBuilder.buildApiUrl(['categories', 'count-inquiries']);
            return $http.get(apiUrl);
        }

        function getCategoriesList() {
            var apiUrl = UrlBuilder.buildApiUrl(['categories']);
            return $http.get(apiUrl);
        }

        function addCategory(model) {
            var apiUrl = UrlBuilder.buildApiUrl(['categories']);
            return $http.put(apiUrl, model);
        }

        function deleteCategory(model) {
            var apiUrl = UrlBuilder.buildApiUrl(['categories', model.id]);
            return $http.delete(apiUrl);
        }

        function getSelectionsList() {
            var apiUrl = UrlBuilder.buildApiUrl(['selections']);
            return $http.get(apiUrl);
        }

        function addSelection(model) {
            var apiUrl = UrlBuilder.buildApiUrl(['selections']);
            return $http.put(apiUrl, model);
        }

        function updateSelection(model) {
            var apiUrl = UrlBuilder.buildApiUrl(['selections', model.id]);
            return $http.post(apiUrl, model);
        }

        function deleteSelection(model) {
            var apiUrl = UrlBuilder.buildApiUrl(['selections', model.id]);
            return $http.delete(apiUrl);
        }

        function addSelectionAnswer(model, sid) {
            var apiUrl = UrlBuilder.buildApiUrl(['selections', sid, 'answer']);
            return $http.put(apiUrl, model);
        }

        function deleteSelectionAnswer(sid, aid) {
            var apiUrl = UrlBuilder.buildApiUrl(['selections', sid, 'answer', aid]);
            return $http.delete(apiUrl);
        }

        function getSelectionDetails(sid) {
            var apiUrl = UrlBuilder.buildApiUrl(['selections', sid]);
            return $http.get(apiUrl);
        }

        function getModulesList() {
            var apiUrl = UrlBuilder.buildApiUrl(['administration', 'modules']);
            return $http.get(apiUrl);
        }

        function addModule(model) {
            var apiUrl = UrlBuilder.buildApiUrl(['module']);
            return $http.put(apiUrl, model);
        }

        function getDetailsOfModule(mid) {
            var apiUrl = UrlBuilder.buildApiUrl(['administration', 'modules', mid]);
            return $http.get(apiUrl);
        }

        function getQuestionTypes() {
            var apiUrl = UrlBuilder.buildApiUrl(['questions-types']);
            return $http.get(apiUrl);
        }

        function addQuestionToModule(mid, model) {
            var apiUrl = UrlBuilder.buildApiUrl(['module', mid, 'question']);
            return $http.put(apiUrl, model);
        }

        function getInquiriesListForAdminPanel() {
            var apiUrl = UrlBuilder.buildApiUrl(['administration', 'inquiries']);
            return $http.get(apiUrl);
        }

        function addInquiry(model) {
            var apiUrl = UrlBuilder.buildApiUrl(['administration', 'inquiry']);
            return $http.put(apiUrl, model);
        }

        function getInquiryDetailsForAdmin(iid) {
            var apiUrl = UrlBuilder.buildApiUrl(['administration', 'inquiry', iid]);
            return $http.get(apiUrl);
        }

        function addGroupToInquiry(iid, model) {
            var apiUrl = UrlBuilder.buildApiUrl(['administration', 'create-group', iid]);
            console.log(model);
            return $http.put(apiUrl, model);
        }

        function adduserToGroup(iid, gid, model) {
            var apiUrl = UrlBuilder.buildApiUrl(['administration', 'inquiry', iid, 'group', gid, 'user']);
            return $http.put(apiUrl, model);
        }

        function addExecutionToModuleInquiry(iid, mid, model) {
            var apiUrl = UrlBuilder.buildApiUrl(['inquiry', iid, 'module', mid, 'module-execution']);
            return $http.put(apiUrl, model);
        }

        function getDashboardAdminData() {
            var apiUrl = UrlBuilder.buildApiUrl(['administration', 'dashboard']);
            return $http.get(apiUrl);
        }
                function acceptUserEnrolment(uid,iid,gid) {
            var apiUrl = UrlBuilder.buildApiUrl(['inquiry-enrollment', iid,'inquiry',gid,'group',uid,'user','accept']);
            return $http.post(apiUrl);
        }
        function rejectUserEnrolment(uid,iid) {
            var apiUrl = UrlBuilder.buildApiUrl(['inquiry-enrollment', iid,'inquiry',uid,'user','reject']);
            return $http.post(apiUrl);
        }

            function changeFlagInInquiry(iid,flag) {
            var apiUrl = UrlBuilder.buildApiUrl(['administration','inquiries',iid,flag]);
            return $http.post(apiUrl);
        }
                    function getUsersAnswersForModule(uid,iid,mid) {
            var apiUrl = UrlBuilder.buildApiUrl(['administration','user',uid,'inquiry',iid,'module',mid,'user-answers']);
            return $http.get(apiUrl);
        }

        //public interface
        service = {
            getDieseasesList: getDieseasesList,
            addDisease: addDisease,
            deleteDisease: deleteDisease,
            getAddictionsList: getAddictionsList,
            addAddiction: addAddiction,
            deleteAddiction: deleteAddiction,
            getCategoriesWithCountList: getCategoriesWithCountList,
            addCategory: addCategory,
            deleteCategory: deleteCategory,
            getSelectionsList: getSelectionsList,
            addSelection: addSelection,
            updateSelection: updateSelection,
            deleteSelection: deleteSelection,
            addSelectionAnswer: addSelectionAnswer,
            deleteSelectionAnswer: deleteSelectionAnswer,
            getSelectionDetails: getSelectionDetails,
            getModulesList: getModulesList,
            addModule: addModule,
            getDetailsOfModule: getDetailsOfModule,
            getQuestionTypes: getQuestionTypes,
            addQuestionToModule: addQuestionToModule,
            getInquiriesListForAdminPanel: getInquiriesListForAdminPanel,
            getCategoriesList: getCategoriesList,
            addInquiry: addInquiry,
            getInquiryDetailsForAdmin: getInquiryDetailsForAdmin,
            addGroupToInquiry: addGroupToInquiry,
            adduserToGroup: adduserToGroup,
            addExecutionToModuleInquiry: addExecutionToModuleInquiry,
            getDashboardAdminData: getDashboardAdminData,
            acceptUserEnrolment:acceptUserEnrolment,
            rejectUserEnrolment:rejectUserEnrolment,
            changeFlagInInquiry:changeFlagInInquiry,
            getUsersAnswersForModule:getUsersAnswersForModule,
        };
        return service;
    }
})();
