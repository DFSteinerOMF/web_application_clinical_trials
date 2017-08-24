(function() {

    'use strict';

    angular
        .module('app')
        .controller('acceptInquiryEnrollment', AcceptInquiryEnrollment);

    AcceptInquiryEnrollment.$inject = [
        '$uibModalInstance',
        'model',
        '$scope',
        'managePanelService',
        'resourceService'
    ];

    function AcceptInquiryEnrollment(
        $uibModalInstance,
        model,
        $scope,

        managePanelService,
        resourceService
    ) {
        var vm = this;
        vm.model = {
            user: {
                'name': '',
                'surname': '',
                'email': '',
                'role': '3',
            },
            infoBox: {
                content: "",
                isVisible: false,
                class: "error-box"
            },
            formSubmited: false,
            incommingModel: model,
            chosedGroup:null
        };

        function ok() {
                managePanelService.acceptUserEnrolment(vm.model.incommingModel.choseduser.id,vm.model.incommingModel.inquiryid,vm.model.chosedGroup).then(onAddSucces, onAddFail);


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

        }

        function cancel() {
            $uibModalInstance.close();
        }

        //public interface
        vm.cancel = cancel;
        vm.ok = ok;
    }

})();
