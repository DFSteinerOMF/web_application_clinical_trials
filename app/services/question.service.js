(function() {
    'use strcit';

    angular
        .module('app')
        .service('questionService', questionService);

    questionService.$inject = [
        '$http',
        '_',

        'UrlBuilder'

    ];

    function questionService(
        $http,
        _,


        UrlBuilder
    ) {

        var service = this;

        function getQuestionsFromModule(id) {
            var apiUrl = UrlBuilder.buildApiUrl(['module', id, 'questions']);
            return $http.get(apiUrl);
        }

        function sendQuestions(inquiryId, moduleId, moduleExecutionId, model){
            var apiUrl = UrlBuilder.buildApiUrl(['inquiry',inquiryId, 'module', moduleId, 'module-execution', moduleExecutionId, 'fill-module']);
            var answers={
                'answers':model
            }

            console.log("aaa",model);
            return $http.put(apiUrl, answers);
        }

        //public interface

        service = {
            getQuestionsFromModule: getQuestionsFromModule,
            sendQuestions: sendQuestions
        };
        return service;
    }
})();
