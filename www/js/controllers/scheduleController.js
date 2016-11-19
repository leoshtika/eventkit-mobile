eventkitApp.controller('scheduleController', function ($scope, ScheduleService, CONST) {
    
    $scope.sessions = ScheduleService.data.sessions;
    
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
    
});
