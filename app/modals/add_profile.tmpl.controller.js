(function() {

    'use strict';

    angular
        .module('app')
        .controller('addUserProfile', AddUserProfile);

    AddUserProfile.$inject = [
        '$uibModalInstance',
        'model',
        '$scope',
        '$filter',
        '_',
        'FileUploader',

        'managePanelService',
        'resourceService',
        'attachmentsService',
        'updateProfileService'
    ];

    function AddUserProfile(
        $uibModalInstance,
        model,
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
                profile: {
                    pesel: "11111111111",
                    phone: "111111111",
                    birth_date: null,
                    age: "",
                    weight: "190",
                    width: "90",
                    bloodtype: "",
                    street: "Sadowa",
                    zipcode: "16-300",
                    town: "Augustów",
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
            infoBox: {
                content: '',
                isVisible: false,
                class: "error-box"
            },
            dateOptions: {
                formatYear: 'yyyy',
                maxDate: new Date(2018, 1, 1),
                minDate: new Date(1900, 1, 1),
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
            incommingModel: model,
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
            managePanelService.getDieseasesList().then(function(response) {
                vm.model.diseases = response.data;
            });

            managePanelService.getAddictionsList().then(function(response) {
                vm.model.addictions = response.data;
            });
        }


        function ok() {
            console.log("AAAA");
            if ($scope.addForm.$valid) {
                vm.model.formSubmited = false;
                _.each(vm.model.chosedaddictions, function(addiction) {
                    vm.model.profile.addictions.push(addiction.id);
                });
                _.each(vm.model.choseddiseases, function(disease) {
                    vm.model.profile.diseases.push(disease.id);
                });
                var currentYear = new Date().getFullYear();
                var aaa= new Date(vm.model.profile.birth_date);
                vm.model.profile.age = currentYear - vm.model.profile.birth_date.getFullYear();
                addFilesToInquiry();
                updateProfileService.updateProfile(vm.model.profile).then(onAddSucces, onAddFail);
            } else {
                console.log(vm.model.diseases);
                vm.model.formSubmited = true;
                $scope.addForm.birthDate.$setTouched();
            }
        }

        function onAddSucces(response) {
            resourceService.changeUserFilled();
            window.location.reload();
            $uibModalInstance.close();
        }

        function onAddFail(response) {
            console.log(resourceService.getApiErrors(response));
            var errors = resourceService.getApiErrors(response);
            vm.model.infoBox.class = "error-box";
            vm.model.infoBox.content = errors[0];
            vm.model.infoBox.isVisible = true;
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

        function cancel() {
            $uibModalInstance.close();
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

        //public interface
        vm.cancel = cancel;
        vm.ok = ok;
        vm.addAddiction = addAddiction;
        vm.addDisease = addDisease;
        vm.deleteDisease = deleteDisease;
        vm.deleteAddiction = deleteAddiction;
    }

})();
