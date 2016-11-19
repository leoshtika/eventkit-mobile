eventkitApp.controller('sessionController', function ($scope, $state, SessionService, CONST) {
    
    $scope.sessions = SessionService.data.sessions;
    
    // For one session info page
    $scope.sessionId = $state.params.sid;
    
    /**
     * Get all sessions from API and copy to the list
     */
    var updateSessionList = function() {
    
        // The following flag makes sure that the data from the API is downloaded only once
        if (SessionService.data.downloadFlag) {
            SessionService.downloadSessions().then(function(response) {
                SessionService.data.sessions = angular.copy(response.data);
                $scope.sessions = SessionService.data.sessions;
                SessionService.data.downloadFlag = false;
            }, function(err) {
                console.log('Error downloading sessions from API: ');
                console.log(err.message);
            })
            .finally(function(){
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    };
    
    /**
     * Download data again from the API
     */
    $scope.doRefresh = function () {
        SessionService.data.downloadFlag = true;
        updateSessionList();
    };
    
    /**
     * Returns the image url based on the session id
     * @param {int} speakerId
     * @returns {String}
     */
    $scope.getImage = function (speakerId) {
        return CONST.urlFiles + 'speakers/' + speakerId + '.png';
    };
    
    /**
     * Reset search filter
     */
    $scope.resetSearch = function(){
        $scope.query = '';
    };
    
    // Load only the first time, because the cache on the view is 'on'
    updateSessionList();
});
