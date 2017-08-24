(function() {

    'use strict';

    angular
        .module('app')
        .config(routesConfig);

    routesConfig.$inject = [
        '$locationProvider',
        '$stateProvider',
        '$urlMatcherFactoryProvider',
        '$urlRouterProvider',
        '$breadcrumbProvider'
    ];

    function routesConfig(
        $locationProvider,
        $stateProvider,
        $urlMatcherFactoryProvider,
        $urlRouterProvider,
        $breadcrumbProvider
    ) {

        $locationProvider.html5Mode(true);

        $breadcrumbProvider.setOptions({
            template: '<div class="breadcrumb-links"><span ng-repeat="step in steps">{{step.ncyBreadcrumbLabel}} / </span></div>',
            includeAbstract: true
        });

        var resolve = function($stateParams) {
            return $stateParams;
        };

        $urlRouterProvider.otherwise('/log-in');
        $urlMatcherFactoryProvider.strictMode(false);
        //anonymus states
        $stateProvider
            .state('logIn', {
                url: '/log-in',
                templateUrl: '/app/modules/auth/log_in/log_in.html',
                controller: 'logInCtrl as logInCtrl',
                data: {
                    permissions: {
                        only: ['anonymous'],
                        redirectTo: 'userProfileNavbar.dashboard'
                    }

                }
            });
        $stateProvider
            .state('register', {
                url: '/register',
                templateUrl: '/app/modules/auth/register/register.html',
                controller: 'registerCtrl as registerCtrl',
                data: {
                    permissions: {
                        only: ['anonymous'],
                        redirectTo: 'userProfileNavbar.dashboard'
                    }

                }
            });

        $stateProvider
            .state('activation', {
                url: '/activation/{token}',
                controller: 'activateCtrl as activateCtrl',
                resolve: {
                    resolveActivation: ['$stateParams', resolve]
                },
                data: {
                    permissions: {
                        only: ['anonymous'],
                        redirectTo: 'userProfileNavbar.dashboard'
                    }

                }
            });

        $stateProvider
            .state('resetPassword', {
                url: '/reset-password/{token}',
                templateUrl: '/app/modules/auth/reset_password/reset_password.html',
                controller: 'resetPasswordCtrl as resetPasswordCtrl',
                resolve: {
                    resolveResetPassword: ['$stateParams', resolve]
                },
                data: {
                    permissions: {
                        only: ['anonymous'],
                        redirectTo: 'userProfileNavbar.dashboard'
                    }

                }
            });
        $stateProvider
            .state('forgotPassword', {
                url: '/forgot-password',
                templateUrl: '/app/modules/auth/forgot_password/forgot_password.html',
                controller: 'forgotPasswordCtrl as forgotPasswordCtrl',
                data: {
                    permissions: {
                        only: ['anonymous'],
                        redirectTo: 'userProfileNavbar.dashboard'
                    }

                }
            });

        ////////////////admin states && navigations
        $stateProvider
            .state('adminNavbar', {
                abstract: true,
                url: '/manage-panel',
                templateUrl: '/app/modules/base/navigations/admin_navigation/admin_navigation.html',
                controller: 'adminNavigationCtrl as adminNavigationCtrl',
                ncyBreadcrumb: {
                    label: 'Panel Zarządzania'
                },
                data: {
                    permissions: {
                        only: ['adminDoctor'],
                        redirectTo: 'logIn'
                    }
                }
            });
        $stateProvider
            .state('adminNavbar.adminDashboard', {
                url: '/dashboard',
                templateUrl: '/app/modules/admin_panel/admin_dashboard/admin_dashboard.html',
                controller: 'adminDashboardCtrl as adminDashboardCtrl',
                ncyBreadcrumb: {
                    label: 'Panel Ogólny'
                },
            });

        $stateProvider
            .state('adminNavbar.diseases', {
                url: '/diseases',
                templateUrl: '/app/modules/admin_panel/diseases/diseases.html',
                controller: 'diseasesCtrl as diseasesCtrl',
                ncyBreadcrumb: {
                    label: 'Słownik Chorób'
                },
                data: {
                    permissions: {
                        only: ['adminDoctor'],
                        redirectTo: 'logIn'
                    }
                }
            });

        $stateProvider
            .state('adminNavbar.addictions', {
                url: '/addictions',
                templateUrl: '/app/modules/admin_panel/addictions/addictions.html',
                controller: 'addictionsCtrl as addictionsCtrl',
                ncyBreadcrumb: {
                    label: 'Słownik Uzależnień'
                },
                data: {
                    permissions: {
                        only: ['adminDoctor'],
                        redirectTo: 'logIn'
                    }
                }
            });

        $stateProvider
            .state('adminNavbar.inquiryCategories', {
                url: '/inquiry-categories',
                templateUrl: '/app/modules/admin_panel/inquiry-categories/inquiry_categories.html',
                controller: 'inquiryCategoryCtrl as inquiryCategoryCtrl',
                ncyBreadcrumb: {
                    label: 'Słownik Kategorii'
                },
                data: {
                    permissions: {
                        only: ['adminDoctor'],
                        redirectTo: 'logIn'
                    }
                }
            });

        $stateProvider
            .state('adminNavbar.selections', {
                url: '/selections',
                templateUrl: '/app/modules/admin_panel/selections/selections.html',
                controller: 'selectionsCtrl as selectionsCtrl',
                ncyBreadcrumb: {
                    label: 'Dostępne Skale/Ankiety'
                },
                data: {
                    permissions: {
                        only: ['adminDoctor'],
                        redirectTo: 'logIn'
                    }
                }
            });

        $stateProvider
            .state('adminNavbar.modules', {
                url: '/modules',
                templateUrl: '/app/modules/admin_panel/modules/modules.html',
                controller: 'modulesCtrl as modulesCtrl',
                ncyBreadcrumb: {
                    label: 'Dostępne Moduły'
                },
                data: {
                    permissions: {
                        only: ['adminDoctor'],
                        redirectTo: 'logIn'
                    }
                }
            });
        $stateProvider
            .state('adminNavbar.moduleDetails', {
                url: '/module-detail/{mid}',
                templateUrl: '/app/modules/admin_panel/modules/module_details/module_details.html',
                controller: 'moduleDetailsCtrl as moduleDetailsCtrl',
                resolve: {
                    moduleId: ['$stateParams', resolve]
                },
                ncyBreadcrumb: {
                    label: 'Szczegóły Modułu'
                },
                data: {
                    permissions: {
                        only: ['adminDoctor'],
                        redirectTo: 'logIn'
                    }
                }
            });

        $stateProvider
            .state('adminNavbar.inquiries', {
                url: '/inquiries',
                templateUrl: '/app/modules/admin_panel/inquiries/inquiries.html',
                controller: 'inquiriesCtrl as inquiriesCtrl',
                ncyBreadcrumb: {
                    label: 'Badania do których masz dostęp'
                },
                data: {
                    permissions: {
                        only: ['adminDoctor'],
                        redirectTo: 'logIn'
                    }
                }
            });

        $stateProvider
            .state('adminNavbar.inquiryDetails', {
                url: '/inquiry-detail/{iid}',
                templateUrl: '/app/modules/admin_panel/inquiries/inquiry_details/inquiry_details.html',
                controller: 'inquiryDetailsCtrl as inquiryDetailsCtrl',
                resolve: {
                    inquiryId: ['$stateParams', resolve]
                },
                ncyBreadcrumb: {
                    label: 'Szczegóły Badania'
                },
                data: {
                    permissions: {
                        only: ['adminDoctor'],
                        redirectTo: 'logIn'
                    }
                }
            });

        $stateProvider
            .state('adminNavbar.chat', {
                url: '/chat-application',
                templateUrl: '/app/modules/messages/messages.html',
                controller: 'messagesCtrl as messagesCtrl',
                data: {
                    permissions: {
                        only: ['adminDoctor', 'user'],
                        redirectTo: 'logIn'
                    },
                },
                ncyBreadcrumb: {
                    label: 'Moje Konwersacje'
                }
            });


        //////////////////////////////////////////////////////
        $stateProvider
            .state('userNavbar', {
                abstract: true,
                templateUrl: '/app/modules/base/navigations/user_navigation/user_navigation.html',
                controller: 'userNavigationCtrl as userNavigationCtrl',
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: 'adminNavbar.adminDashboard'
                    }
                }
            });
        $stateProvider
            .state('userProfileNavbar.dashboard', {
                url: '/dashboard',
                templateUrl: '/app/modules/user_panel/dashboard/dashboard.html',
                controller: 'dashboardCtrl as dashboardCtrl',
                ncyBreadcrumb: {
                    label: 'Dostępne badania'
                }
            });

        //////////////////////////////////////////////////////
        $stateProvider
            .state('userProfileNavbar', {
                abstract: true,
                templateUrl: '/app/modules/base/navigations/user_profile_navigation/user_profile_navigation.html',
                controller: 'userProfileNavigationCtrl as userProfileNavigationCtrl',
                data: {
                    permissions: {
                        only: ['user'],
                        redirectTo: 'adminNavbar.adminDashboard'
                    }
                },

            });

        $stateProvider
            .state('userProfileNavbar.showUserModules', {
                url: '/profile/modules',
                templateUrl: '/app/modules/user_panel/user_modules/user_modules.html',
                controller: 'userModules as userModules',
                ncyBreadcrumb: {
                    label: 'Twoje Moduły'
                }
            });

        $stateProvider
            .state('userProfileNavbar.showUserEnrolls', {
                url: '/profile/enrolls',
                templateUrl: '/app/modules/user_panel/user_enrolls/user_enrolls.html',
                controller: 'userEnrolls as userEnrolls',
                ncyBreadcrumb: {
                    label: 'Twoje Zapisy'
                }
            });



        $stateProvider
            .state('userProfileNavbar.showQuestions', {
                url: '/profile/showQuestions/{mid}/{meid}',
                resolve: {
                    moduleId: ['$stateParams', resolve],
                    moduleExecutionId: ['$stateParams', resolve]
                },
                templateUrl: '/app/modules/user_panel/user_questions/user_questions.html',
                controller: 'userQuestions as userQuestions',
                ncyBreadcrumb: {
                    label: 'Wypełnianie pytań'
                }
            });

        $stateProvider
            .state('userProfileNavbar.editUserProfile', {
                url: '/profile/editProfile',
                templateUrl: '/app/modules/user_panel/edit_user_profile/edit_user_profile.html',
                controller: 'editUserProfile as editUserProfile',
                ncyBreadcrumb: {
                    label: 'Edycja Profilu'
                }
            });

        $stateProvider
            .state('userProfileNavbar.question_success', {
                url: '/profile/questionSucess',
                templateUrl: '/app/modules/user_panel/questions_success/questions_success.html',
                controller: 'questionSuccessCtrl as questionSuccessCtrl',
                ncyBreadcrumb: {
                    label: 'Sukces'
                }
            });

        $stateProvider
            .state('userProfileNavbar.chat', {
                url: '/chat-application',
                templateUrl: '/app/modules/messages/messages.html',
                controller: 'messagesCtrl as messagesCtrl',
                data: {
                    permissions: {
                        only: ['adminDoctor', 'user'],
                        redirectTo: 'logIn'
                    },
                },
                ncyBreadcrumb: {
                    label: 'Moje Konwersacje'
                }
            });
    }
})();
