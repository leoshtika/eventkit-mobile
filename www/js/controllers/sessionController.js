eventkitApp.controller('sessionController', function ($scope, $state, SessionService, QuestionService, ScheduleService, CONST) {
    
    $scope.sessions = SessionService.data.sessions;
    
    // For one session info page
    $scope.sessionId = $state.params.sid;
    
    // Reset download question flag, so that it can donwnload the questions when entering in question controller
    QuestionService.data.downloadFlag = true;
    
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
    
    /**
     * Check if this session is in my schedule
     * @returns {Boolean}
     */
    $scope.isInMySchedule = function(sessionId){
        var response = false;
        angular.forEach(ScheduleService.data.sessions, function(value, key){
            if (value.id === sessionId){
                response = true;
            }
        });
        return response;
    };
    
    /**
     * Add this session to my schedule
     */
    $scope.addToMySchedule = function(){
        angular.forEach($scope.sessions, function(value, key){
            if (value.id === $scope.sessionId){
                ScheduleService.data.sessions.push(value);
            }
        });
    };
    
    /**
     * Remove this session from my schedule
     */
    $scope.removeFromMySchedule = function(){
        angular.forEach(ScheduleService.data.sessions, function(value, key){
            if (value.id === $scope.sessionId){
                ScheduleService.data.sessions.splice(key, 1);
            }
        });
    };
    
    // Load only the first time, because the cache on the view is 'on'
    updateSessionList();
});
