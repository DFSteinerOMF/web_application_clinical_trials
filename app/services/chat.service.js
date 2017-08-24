(function() {
    'use strcit';

    angular
        .module('app')
        .service('chatService', chatService);

    chatService.$inject = [
        '$http',
        '_',
        'UrlBuilder'

    ];

    function chatService(
        $http,
        _,

        UrlBuilder
    ) {

        var service = this;

        function getConversations() {
            var apiUrl = UrlBuilder.buildApiUrl(['get-conversations']);
            return $http.get(apiUrl, {
                ignoreLoadingBar: true
            });
        }

        function createConversations(conversationId) {
            var apiUrl = UrlBuilder.buildApiUrl(['create-conversation', conversationId]);
            return $http.put(apiUrl);
        }

        function getMessagesFromConversation(conversationId) {
            var apiUrl = UrlBuilder.buildApiUrl(['conversation', conversationId, 'messages']);
            return $http.get(apiUrl, {
                ignoreLoadingBar: true
            });
        }

        function sendMessageToConversation(conversationId, model) {
            var apiUrl = UrlBuilder.buildApiUrl(['conversation', conversationId, 'messages']);
            return $http.put(apiUrl, model, {
                ignoreLoadingBar: true
            });
        }

        function getSingleUnreadMessage(conversationId, messageId) {
            var apiUrl = UrlBuilder.buildApiUrl(['conversation', conversationId, 'message', messageId]);
            return $http.get(apiUrl, {
                ignoreLoadingBar: true
            });
        }

        //public interface
        service = {
            getConversations: getConversations,
            createConversations: createConversations,
            getMessagesFromConversation: getMessagesFromConversation,
            sendMessageToConversation: sendMessageToConversation,
            getSingleUnreadMessage: getSingleUnreadMessage,
        };
        return service;
    }
})();
