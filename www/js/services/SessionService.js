eventkitApp.factory('SessionService', function ($http, CONST) {

    return {
        
        data: {
            // 'downloadFlag' is a used to avoid download data from API everytime the view is opened
            downloadFlag: true,
            // 'sessions' keep all the sessions throughout different controllers
            sessions: []
        },
        
        /**
         * Returns a promise for all sessions
         * @returns {promise}
         */
        downloadSessions: function() {
            return $http({
                url: CONST.urlAPI + 'sessions',
                method: "GET"
            });
        }        
    };
});
