(function() {

    'use strict';

    angular
        .module('app')
        .controller('editUserProfile', EditUserProfile);

    EditUserProfile.$inject = [
        '$scope',
        '$filter',
        '_',

        'FileUploader',

        'managePanelService',
        'resourceService',
        'attachmentsService',
        'updateProfileService'
    ];

    function EditUserProfile(
        $scope,
        $filter,
        _,

        FileUploader,

        managePanelService,
        resourceService,
        attachmentsService,
        updateProfileService
    ) {
        var vm = this;
        vm.model = {
            userProfile: {
                id: 1,
                email: "",
                name: "",
                surname: "",
                is_profile_filled: 1,
                created_at: null,
                updated_at: "",
                profile: {
                    id: 2,
                    user_id: 1,
                    pesel: "11111111111",
                    phone: "111111111",
                    birth_date: "",
                    age: "",
                    weight: "",
                    width: "",
                    bloodtype: "",
                    street: "",
                    zipcode: "",
                    town: "",
                    gender: "",
                    aboutme: "AboutMe",
                    diseases: [],
                    addictions: [],
                    attachments: [{
                        name: "",
                        real_name: "",
                        description: ""
                    }, {
                        name: "",
                        real_name: "",
                        description: ""
                    }]
                },
                groups: [],
                roles: [{
                    id: 1,
                    name: "",
                    label: ""
                }]
            },
            infoBox: {
                content: '',
                isVisible: false,
                class: "error-box"
            },
            dateOptions: {
                formatYear: 'yyyy',
                maxDate: new Date(2018, 1, 1),
                minDate: new Date(),
                startingDay: 1,
            },
            datePickerOptions: {
                dateFormat: 'dd/MM/yyyy',
                opened: false,
            },
            bloodTypeList: [
                "ABRh+",
                "ABRh-",
                "ARh+",
                "ARh-",
                "BRh+",
                "Brh-",
                "0Rh+",
                "0Rh-"
            ],
            genders: [
                "M",
                "K"
            ],
            formSubmited: false,
            diseases: [],
            addictions: [],
            choseddiseases: [],
            chosedaddictions: [],
            selectedDisease: null,
            selectedAddiction: null,
            howManyFileUploaded: 0
        };
        var uploader = $scope.uploader = new FileUploader();
        activate();

        function activate() {
            updateProfileService.getUserData().then(onGetUserData);
            managePanelService.getDieseasesList().then(function(response) {
                vm.model.diseases = response.data;
            });
            managePanelService.getAddictionsList().then(function(response) {
                vm.model.addictions = response.data;
            });
        }

        function onGetUserData(response) {
            vm.model.userProfile = response.data;
            console.log(vm.model.userProfile.profile);

            vm.model.choseddiseases = vm.model.userProfile.profile.diseases;
            vm.model.chosedaddictions = vm.model.userProfile.profile.addictions;
        }


        function ok() {
            if ($scope.addForm.$valid) {
                vm.model.formSubmited = false;
                vm.model.userProfile.profile.addictions=[];
                vm.model.userProfile.profile.diseases=[];
                _.each(vm.model.chosedaddictions, function(addiction) {
                    //if (vm.model.userProfile.profile.addictions.indexOf(addiction.id) === -1) {
                        vm.model.userProfile.profile.addictions.push(addiction.id);
                    //}
                });
                _.each(vm.model.choseddiseases, function(disease) {
                   // if (vm.model.userProfile.profile.diseases.indexOf(disease.id) === -1) {
                        vm.model.userProfile.profile.diseases.push(disease.id);
                   // }
                });
                var currentYear = new Date().getFullYear();
                vm.model.userProfile.profile.age = currentYear - vm.model.userProfile.profile.birth_date.getFullYear();
                updateProfileService.editProfile(vm.model.userProfile.profile).then(onEditSuccess, onEditFail);
            } else {
                console.log("AAAA");
                vm.model.formSubmited = true;
                $scope.addForm.birthDate.$setTouched();
            }
        }

        function discardChanges() {
            updateProfileService.getUserData().then(onGetUserData);
            managePanelService.getDieseasesList().then(function(response) {
                vm.model.diseases = response.data;
            });
            managePanelService.getAddictionsList().then(function(response) {
                vm.model.addictions = response.data;
            });
        }

        function onEditSuccess(response) {
            console.log("EDYCJA OK");
            vm.model.infoBox.class = "success-box";
            vm.model.infoBox.msg = "Zapisano pomyślnie";
            vm.model.infoBox.isVisible = true;
        }

        function onEditFail(response) {
            console.log(resourceService.getApiErrors(response));
            var errors = resourceService.getApiErrors(response);
            vm.model.infoBox.class = "error-box";
            vm.model.infoBox.msg = errors[0];
            vm.model.infoBox.isVisible = true;
        }

        function dateUpdated() {
            vm.model.dateOptions.minDate = new Date(1900, 1, 1);
            vm.model.datePickerOptions.opened = true;
        }

        function addAddiction() {
            vm.model.chosedaddictions.push(vm.model.selectedAddiction.originalObject);
            var index = vm.model.addictions.indexOf(vm.model.selectedAddiction.originalObject);
            vm.model.addictions.splice(index, 1);
            $scope.$broadcast('angucomplete-alt:clearInput');
        }

        function addDisease() {
            vm.model.choseddiseases.push(vm.model.selectedDisease.originalObject);
            var index = vm.model.diseases.indexOf(vm.model.selectedDisease.originalObject);
            vm.model.diseases.splice(index, 1);
            $scope.$broadcast('angucomplete-alt:clearInput');
        }

        function deleteAddiction(index) {
            vm.model.addictions.push(vm.model.chosedaddictions[index]);
            vm.model.chosedaddictions.splice(index, 1);

        }

        function deleteDisease(index) {
            vm.model.diseases.push(vm.model.choseddiseases[index]);
            vm.model.choseddiseases.splice(index, 1);

        }

        function addFilesToInquiry() {
            var howManyUploaded = 0;
            _.each($scope.uploader.queue, function(singleFile) {
                if (!(_.isUndefined(singleFile._file))) {
                    attachmentsService.upLoadAttachment(singleFile._file).then(onSuccesUpload, onAddFail);
                }
            });

            function onSuccesUpload(response) {
                howManyUploaded++;
                var uploadedDataFile = response.data;
                uploadedDataFile.description = 'testowy opis';
                vm.model.profile.attachments.push(uploadedDataFile);
                if (howManyUploaded == $scope.uploader.queue.length) {
                    //managePanelService.addInquiry(vm.model.profile).then(onAddSucces, onAddFail);
                }
            }
        }

        //public interface
        vm.ok = ok;
        vm.dateUpdated = dateUpdated;
        vm.addAddiction = addAddiction;
        vm.addDisease = addDisease;
        vm.deleteDisease = deleteDisease;
        vm.deleteAddiction = deleteAddiction;
        vm.discardChanges = discardChanges;
    }

})();
