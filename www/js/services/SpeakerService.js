eventkitApp.factory('SpeakerService', function ($http, CONST) {

    return {
        
        /**
         * Returns a promise for all speakers
         * @returns {promise}
         */
        getSpeakers: function() {

            return $http({
                url: CONST.urlAPI + 'speakers',
                method: "GET"
            });
        }        
    };
});
