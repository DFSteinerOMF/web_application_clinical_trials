/**
 * @name  Translation service
 * @description
 * angular service encapsulating API callbacks
 *
 */
(function() {
    'use strict';

    angular.module('app').service('UrlBuilder', UrlBuilder);

    UrlBuilder.$inject = [
        'config'
    ];

    function UrlBuilder(
        config
    ) {

        var service = this;

        function _buildUrl(baseUrl, args) {
            var url = config.backend + baseUrl;
            foreach_(args, function(next, i) {
                url += next;
                if (i !== args.length - 1) url += '/';
            });
            return url;
        }

        function foreach_(array, fn) {
            var i = 0;
            var max;
            for (i = 0, max = array.length; i < max; i += 1)
                fn.call(array, array[i], i);
        }

        function buildUrl(args) {
            return _buildUrl('/', args);
        }

        function buildApiUrl(args) {
            return _buildUrl('/api/', args);
        }


        // public interface
        service.buildUrl = buildUrl;
        service.buildApiUrl = buildApiUrl;
    }
})();
