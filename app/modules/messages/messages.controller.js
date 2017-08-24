(function() {
    'use strict';
    angular
        .module('app')
        .controller('messagesCtrl', MessagesController);

    MessagesController.$inject = [
        '$log',
        '$state',
        '$scope',
        '$pusher',
        'store',
        '_',
        '$timeout',

        'authService',
        'chatService',
        'resourceService',
        'config'
    ];

    function MessagesController(
        $log,
        $state,
        $scope,
        $pusher,
        store,
        _,
        $timeout,

        authService,
        chatService,
        resourceService,
        config
    ) {
        var vm = this;
        vm.model = {
            conversations: null,
            activeConversation: null,
            activeConversationWithMessages: null,
            showActiveConversation: true,
            activeLabel: 'Aktywne Konwersacje',
            loggedUserId: store.get('userLoggedData').id,
            newMsg: {
                'content': ''
            }
        };
        activate();


        function activate() {
            refreshConversation();
            //Pusher.logToConsole = true;
            var accesToken = '';
            if (!_.isNull(store.get('Authorization_Data'))) {
                accesToken = store.get('Authorization_Data').access_token;
            }

            var pusher = new Pusher(config.pusherApiKey, {
                cluster: 'eu',
                encrypted: true,
                authEndpoint: config.backend + '/api/pusher-auth',
                auth: {
                    headers: {
                        'Authorization': 'Bearer ' + accesToken
                    }
                }
            });
            var my_private_channel = pusher.subscribe('for_user_' + store.get('userLoggedData').id);
            my_private_channel.bind('new_message',
                function(data) {
                    if (vm.model.activeConversation !== null && vm.model.activeConversation.id == data.thread_id) {
                        chatService.getSingleUnreadMessage(data.thread_id, data.message_id).then(function(response) {
                            vm.model.activeConversationWithMessages.messages.push(response.data);
                            autoscrollDown();
                        });
                    } else {
                        refreshConversation();
                    }
                }
            );
            my_private_channel.bind('new_conversation',
                function(data) {
                    refreshConversation();
                    vm.model.showActiveConversation=true;
                    vm.model.activeLabel='Aktywne Konwersacje';
                }
            );
        }

        function refreshConversation() {
            chatService.getConversations().then(function(response) {
                vm.model.conversations = response.data;
            });
        }

        function createNewConversation(user) {
            chatService.createConversations(user.id).then(function(response) {
                refreshConversation();
            });
        }

        function choseActiveConversation(conversation) {
            vm.model.activeConversation = null;
            vm.model.activeConversationWithMessages = null;
            vm.model.activeConversation = conversation;
            chatService.getMessagesFromConversation(conversation.id).then(function(response) {
                vm.model.activeConversationWithMessages = response.data;
                autoscrollDown();
                conversation.unread_msg_counter = 0;
            });
        }

        function sendMsg(conversionID) {
            if (vm.model.newMsg.content !== '') {
                chatService.sendMessageToConversation(conversionID, vm.model.newMsg).then(function(response) {
                    vm.model.newMsg.content = '';
                    vm.model.activeConversationWithMessages.messages.push(response.data);
                    autoscrollDown();
                });
            }

        }

        function autoscrollDown() {
            $timeout(function() {
                var scroller = document.getElementById("messagesScroll");
                scroller.scrollTop = scroller.scrollHeight;
            }, 0, false);
        }


        // public interface
        vm.createNewConversation = createNewConversation;
        vm.choseActiveConversation = choseActiveConversation;
        vm.sendMsg = sendMsg;

    }
})();
