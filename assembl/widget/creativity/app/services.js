"use strict";

creativityApp.factory('globalVideoConfig', function($http){

    var api_rest = 'test/globalVideoConfig.json';

    return {
        fetch : function() {
            return $http.get(api_rest);
        }
    }

});

creativityApp.factory('globalConfig', function($http){

    var api_rest = 'test/test.json';

    return {
        fetch : function() {
            return $http.get(api_rest);
        }
    }

});

creativityApp.factory('globalMessages', function($http){

    var api_rest = 'test/session.json';

    return {
        fetch: function() {
            return $http.get(api_rest);
        }
    }

});