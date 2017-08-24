(function() {
    'use strict';
    angular
        .module('app')
        .controller('userQuestions', UserQuestions);

    UserQuestions.$inject = [
        '$log',
        '$state',
        '$scope',

        'FileUploader',

        'authService',
        'resourceService',
        'studyService',
        'moduleId',
        'questionService',
        'attachmentsService',
        'userModulesService',
        'moduleExecutionId'
    ];

    function UserQuestions(
        $log,
        $state,
        $scope,

        FileUploader,

        authService,
        resourceService,
        studyService,
        moduleId,
        questionService,
        attachmentsService,
        userModulesService,
        moduleExecutionId
    ) {
        var vm = this;
        vm.model = {
            currentModule: {},
            answers: [],
            infoBox: {
                msg: "",
                isVisible: false,
                class: "error-box"
            },
            showBodyBack: false,
            userGender: "M",
            formSubmited: false,
            bodyPartDesctiption: [],
            howManyFileUploaded: 0
        };
        var uploader = $scope.uploader = new FileUploader();
        activate();

        function activate() {
            console.log(moduleId);
            questionService.getQuestionsFromModule(moduleId.mid).then(onGetQuestions);
        }

        function onGetQuestions(response) {
            vm.model.currentModule = response.data;
            console.log(vm.model.currentModule);
            var i;
        }

        function sendAnswers() {
            vm.model.answers = [];
            _.each(vm.model.currentModule.questions, function(question) {
                console.log(question);
                switch (question.question_type_id) {
                    case 1:
                        vm.model.answers.push({ "data": "www", "question_id": question.id });
                        break;
                    case 2:
                        vm.model.answers.push({ "data": "FILE", "question_id": question.id });
                        break;
                    case 3:
                        vm.model.answers.push({ "data": question.selection.selection_answers[0].id, "question_id": question.id });
                        break;
                    case 4:
                        vm.model.answers.push({ "data": question.selection.selection_answers[0].id, "question_id": question.id });
                        break;
                    case 5:
                        vm.model.answers.push({ "data": 1, "question_id": question.id, "body_part_id": 1 });
                        break;
                }
            });






            questionService.sendQuestions(resourceService.getCurrentLogedUser().active_inquiry_id, vm.model.currentModule.id, moduleExecutionId.meid, vm.model.answers).then(onSuccessAnswer, onFail);
        }

        function onSuccessAnswer(response) {
            console.log("POWODZENIE!");
            $state.go('userProfileNavbar.question_success');
        }

        function onFail(response) {
            console.log(response.data);
        }

        function addFilesToInquiry(fileNumber) {
            var howManyUploaded = 0;
            vm.model.answers[fileNumber] = vm.model.answers[fileNumber] + $scope.uploader.queue;
            _.each($scope.uploader.queue, function(singleFile) {
                if (!(_.isUndefined(singleFile._file))) {
                    attachmentsService.upLoadQuestionAttachment(singleFile._file).then(onSuccesUpload, onAddFail);
                }
            });

            function onSuccesUpload(response) {
                console.log("SUCCES UPLOAD!");
            }

            function onAddFail(response) {
                console.log(response);
            }
        }

        vm.addFilesToInquiry = addFilesToInquiry;
        vm.sendAnswers = sendAnswers;
    }
})();
