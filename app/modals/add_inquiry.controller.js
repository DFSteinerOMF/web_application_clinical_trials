(function() {

    'use strict';

    angular
        .module('app')
        .controller('addInquiryCtrl', AddInquiryCtrl);

    AddInquiryCtrl.$inject = [
        '$uibModalInstance',
        'model',
        '$scope',
        '$filter',
        '_',
        'FileUploader',

        'managePanelService',
        'resourceService',
        'attachmentsService'
    ];

    function AddInquiryCtrl(
        $uibModalInstance,
        model,
        $scope,
        $filter,
        _,
        FileUploader,

        managePanelService,
        resourceService,
        attachmentsService
    ) {
        var vm = this;
        vm.model = {
            inquiry: {
                'name': '',
                'description': '',
                'age_from': '',
                'age_to': '',
                'weight_from': '',
                'weight_to': '',
                'width_from': '',
                'width_to': '',
                'blood_type': '',
                'startSingUpDate': '11/11/2011',
                'endSingUpDate': '11/11/2011',
                'startDate': null,
                'endDate': null,
                'is_active': false,
                'is_visible': true,
                'is_enrollment_open': true,
                'attachments': [],
                'categories': [],
                'modules': [],
                'diseases': [],
                'addictions': []
            },
            infoBox: {
                content: '',
                isVisible: false,
                class: "error-box"
            },
            dateOptionsStart: {
                formatYear: 'yyyy',
                maxDate: new Date(2018, 1, 1),
                minDate: new Date(),
                startingDay: 1,
            },
            dateOptionsEnd: {
                formatYear: 'yyyy',
                maxDate: new Date(2018, 1, 1),
                minDate: null,
                startingDay: 1,
            },
            daatePickerOptionsStart: {
                dateFormat: 'dd/MM/yyyy',
                opened: false,
            },
            datePickerOptionsEnd: {
                dateFormat: 'dd/MM/yyyy',
                opened: false,
            },
            formSubmited: false,
            incommingModel: model,
            categories: [],
            modules: [],
            diseases: [],
            addictions: [],
            chosedcategories: [],
            chosedmodules: [],
            choseddiseases: [],
            chosedaddictions: [],
            selectedCategory: null,
            selectedModule: null,
            selectedDisease: null,
            selectedAddiction: null,
            howManyFileUploaded: 0,
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
            managePanelService.getCategoriesList().then(function(response) {
                vm.model.categories = response.data;
            });
            managePanelService.getModulesList().then(function(response) {
                vm.model.modules = response.data;
            });
        }

        function ok() {
            if ($scope.addForm.$valid) {
                vm.model.formSubmited = false;
                _.each(vm.model.chosedaddictions, function(addiction) {
                    vm.model.inquiry.addictions.push(addiction.id);
                });
                _.each(vm.model.choseddiseases, function(disease) {
                    vm.model.inquiry.diseases.push(disease.id);
                });
                _.each(vm.model.chosedcategories, function(category) {
                    vm.model.inquiry.categories.push(category.id);
                });
                _.each(vm.model.chosedmodules, function(innerModule) {
                    vm.model.inquiry.modules.push(innerModule.id);
                });
                addFilesToInquiry();
            } else {
                vm.model.formSubmited = true;
                $scope.addForm.startDate.$setTouched();
                $scope.addForm.endDate.$setTouched();
            }
        }

        function onAddSucces(response) {
            vm.model.incommingModel.succesCallback(response);
            $uibModalInstance.close();
        }

        function onAddFail(response) {
            var errors = resourceService.getApiErrors(response);
            vm.model.infoBox.class = "error-box";
            vm.model.infoBox.content = errors[0];
            vm.model.infoBox.isVisible = true;
        }

        function cancel() {
            $uibModalInstance.close();
        }

        function endDataUpdated() {
            vm.model.dateOptionsEnd.minDate = (_.isNull(vm.model.inquiry.startDate)) ? new Date() : vm.model.inquiry.startDate;
            vm.model.datePickerOptionsEnd.opened = true;
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

        function addCategory() {
            vm.model.chosedcategories.push(vm.model.selectedCategory.originalObject);
            var index = vm.model.categories.indexOf(vm.model.selectedCategory.originalObject);
            vm.model.categories.splice(index, 1);
            $scope.$broadcast('angucomplete-alt:clearInput');
        }

        function addModule() {
            vm.model.chosedmodules.push(vm.model.selectedModule.originalObject);
            var index = vm.model.modules.indexOf(vm.model.selectedModule.originalObject);
            vm.model.modules.splice(index, 1);
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

        function deleteCategory(index) {
            vm.model.categories.push(vm.model.chosedcategories[index]);
            vm.model.chosedcategories.splice(index, 1);

        }

        function deleteModule(index) {
            vm.model.modules.push(vm.model.chosedmodules[index]);
            vm.model.chosedmodules.splice(index, 1);

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
                vm.model.inquiry.attachments.push(uploadedDataFile);
                if (howManyUploaded == $scope.uploader.queue.length) {
                    managePanelService.addInquiry(vm.model.inquiry).then(onAddSucces, onAddFail);

                }
            }
        }

        //public interface
        vm.cancel = cancel;
        vm.ok = ok;
        vm.endDataUpdated = endDataUpdated;
        vm.addAddiction = addAddiction;
        vm.addDisease = addDisease;
        vm.addCategory = addCategory;
        vm.addModule = addModule;
        vm.deleteDisease = deleteDisease;
        vm.deleteAddiction = deleteAddiction;
        vm.deleteCategory = deleteCategory;
        vm.deleteModule = deleteModule;
    }

})();
