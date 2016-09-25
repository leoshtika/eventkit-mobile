eventkitApp.factory('SpeakerService', function ($http, CONST) {

    return {
        
        data: {
            // 'downloadFlag' is a used to avoid download data from API everytime the view is opened
            downloadFlag: true,
            // 'speakers' keep all the speakers throughout different controllers
            speakers: []
        },
        
        /**
         * Returns a promise for all speakers
         * @returns {promise}
         */
        downloadSpeakers: function() {
            return $http({
                url: CONST.urlAPI + 'speakers',
                method: "GET"
            });
        }        
    };
});
