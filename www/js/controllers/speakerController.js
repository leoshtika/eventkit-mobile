eventkitApp.controller('speakerController', function ($scope, $state, SpeakerService, CONST) {
    
    $scope.speakers = SpeakerService.data.speakers;
    
    /**
     * Get all reports from local DB (SQLite) and copy to the list
     * @returns {undefined}
     */
    var updateSpeakerList = function() {
    
        // Download from the API only once
        if (SpeakerService.data.downloadFlag) {
            SpeakerService.downloadSpeakers().then(function(response) {
                SpeakerService.data.speakers = angular.copy(response.data);
                $scope.speakers = SpeakerService.data.speakers;
                SpeakerService.data.downloadFlag = false;
            }, function(err) {
                console.log('Error downloading speakers from API: ');
                console.log(err.message);
            });
        }
    };
    
    // For one speaker info page
    $scope.speakerId = $state.params.id;

    /**
     * Returns the image url based on the speaker id
     * @param {Obj} speaker
     * @returns {String}
     */
    $scope.getImage = function (speaker) {
        return CONST.urlFiles + 'speakers/' + speaker.id + '.png';
    };
    
    /**
     * Reset search filter
     */
    $scope.resetSearch = function(){
        $scope.query = '';
    };


    // Load only the first time, because the cache on the view is 'on'
    updateSpeakerList();
});
