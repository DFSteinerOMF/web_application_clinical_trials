(function() {
    'use strict';

    angular
        .module('app')
        .factory('modalService', modalService);

    modalService.$inject = [
        '$http',
        '$uibModal',
        '$state'
    ];

    function modalService(
        $http,
        $uibModal,
        $state
    ) {

        var factory = {
            showModal: showModal
        };

        function showModal(modelToCtrl, modalType) {
            var model = modelToCtrl;
            var modalInstance = null;
            switch (modalType) {
                case 'addDiseases':
                    modalInstance = $uibModal.open({
                        size: 'md',
                        animation: true,
                        bindToController: true,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: '/app/modals/add_disease.tmpl.html',
                        controller: 'addDiseaseCtrl as addDiseaseCtrl',
                        resolve: {
                            model: function() {
                                return model;
                            }
                        }
                    });
                    break;
                case 'addAddiction':
                    modalInstance = $uibModal.open({
                        size: 'md',
                        animation: true,
                        bindToController: true,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: '/app/modals/add_addiction.tmpl.html',
                        controller: 'addAddictionCtrl as addAddictionCtrl',
                        resolve: {
                            model: function() {
                                return model;
                            }
                        }
                    });
                    break;
                case 'addCategory':
                    modalInstance = $uibModal.open({
                        size: 'md',
                        animation: true,
                        bindToController: true,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: '/app/modals/add_category.tmpl.html',
                        controller: 'addCategoryCtrl as addCategoryCtrl',
                        resolve: {
                            model: function() {
                                return model;
                            }
                        }
                    });
                    break;
                case 'addSelection':
                    modalInstance = $uibModal.open({
                        size: 'md',
                        animation: true,
                        bindToController: true,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: '/app/modals/add_selection.tmpl.html',
                        controller: 'addSelectionCtrl as addSelectionCtrl',
                        resolve: {
                            model: function() {
                                return model;
                            }
                        }
                    });
                    break;
                case 'editSelection':
                    modalInstance = $uibModal.open({
                        size: 'md',
                        animation: true,
                        bindToController: true,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: '/app/modals/edit_selection.tmpl.html',
                        controller: 'editSelectionCtrl as editSelectionCtrl',
                        resolve: {
                            model: function() {
                                return model;
                            }
                        }
                    });
                    break;
                case 'addModule':
                    modalInstance = $uibModal.open({
                        size: 'md',
                        animation: true,
                        bindToController: true,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: '/app/modals/add_module.tmpl.html',
                        controller: 'addModuleCtrl as addModuleCtrl',
                        resolve: {
                            model: function() {
                                return model;
                            }
                        }
                    });
                    break;
                case 'showScaleRadio':
                    modalInstance = $uibModal.open({
                        size: 'md',
                        animation: true,
                        bindToController: true,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: '/app/modals/show_scale_radio.tmpl.html',
                        controller: 'showRadioScale as showRadioScale',
                        resolve: {
                            model: function() {
                                return model;
                            }
                        }
                    });
                    break;
                case 'addQuestion':
                    modalInstance = $uibModal.open({
                        size: 'lg',
                        animation: true,
                        bindToController: true,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: '/app/modals/add_question.tmpl.html',
                        controller: 'addQuestionCtrl as addQuestionCtrl',
                        resolve: {
                            model: function() {
                                return model;
                            }
                        }
                    });
                    break;
                case 'addInquiry':
                    modalInstance = $uibModal.open({
                        size: 'lg',
                        animation: true,
                        bindToController: true,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: '/app/modals/add_inquiry.tmpl.html',
                        controller: 'addInquiryCtrl as addInquiryCtrl',
                        resolve: {
                            model: function() {
                                return model;
                            }
                        }
                    });
                    break;
                case 'addGroup':
                    modalInstance = $uibModal.open({
                        size: 'md',
                        animation: true,
                        bindToController: true,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: '/app/modals/add_group.tmpl.html',
                        controller: 'addGroupCtrl as addGroupCtrl',
                        resolve: {
                            model: function() {
                                return model;
                            }
                        }
                    });
                    break;

                case 'showUserGroup':
                    modalInstance = $uibModal.open({
                        size: 'lg',
                        animation: true,
                        bindToController: true,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: '/app/modals/show_group_users.html',
                        controller: 'showUsersGroup as showUsersGroup',
                        resolve: {
                            model: function() {
                                return model;
                            }
                        }
                    });
                    break;
                case 'addUserToGroup':
                    modalInstance = $uibModal.open({
                        size: 'lg',
                        animation: true,
                        bindToController: true,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: '/app/modals/add_user_to_group.html',
                        controller: 'addUserToGroup as addUserToGroup',
                        resolve: {
                            model: function() {
                                return model;
                            }
                        }
                    });
                    break;

                case 'addModuleExecution':
                    modalInstance = $uibModal.open({
                        size: 'md',
                        animation: true,
                        bindToController: true,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: '/app/modals/add_module_execution.html',
                        controller: 'addModuleExecution as addModuleExecution',
                        resolve: {
                            model: function() {
                                return model;
                            }
                        }
                    });
                    break;
                case 'addProfile':
                    modalInstance = $uibModal.open({
                        size: 'md',
                        animation: true,
                        bindToController: true,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: '/app/modals/add_profile.tmpl.html',
                        controller: 'addUserProfile as addUserProfile',
                        resolve: {
                            model: function() {
                                return model;
                            }
                        }
                    });
                    break;
                    case 'acceptUserEnrollment':
                    modalInstance = $uibModal.open({
                        size: 'sm',
                        animation: true,
                        bindToController: true,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: '/app/modals/accept_inquiry_enrollment.html',
                        controller: 'acceptInquiryEnrollment as acceptInquiryEnrollment',
                        resolve: {
                            model: function() {
                                return model;
                            }
                        }
                    });
                    break;
                case 'showUserAnswerModal':
                    modalInstance = $uibModal.open({
                        size: 'lg',
                        animation: true,
                        bindToController: true,
                        backdrop: 'static',
                        keyboard: false,
                        templateUrl: '/app/modals/show_user_answers.html',
                        controller: 'showUsersAnswers as showUsersAnswers',
                        resolve: {
                            model: function() {
                                return model;
                            }
                        }
                    });
                    break;
            }
        }
        return factory;
    }
})();
