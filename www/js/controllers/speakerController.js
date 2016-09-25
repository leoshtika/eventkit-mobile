eventkitApp.controller('speakerController', function ($scope, $state, SpeakerService, CONST) {
    
    $scope.speakers = SpeakerService.data.speakers;
    
    // For one speaker info page
    $scope.speakerId = $state.params.id;
    
    /**
     * Get all speakers from API and copy to the list
     */
    var updateSpeakerList = function() {
    
        // The following flag makes sure that the data from the API is downloaded only once
        if (SpeakerService.data.downloadFlag) {
            SpeakerService.downloadSpeakers().then(function(response) {
                SpeakerService.data.speakers = angular.copy(response.data);
                $scope.speakers = SpeakerService.data.speakers;
                SpeakerService.data.downloadFlag = false;
            }, function(err) {
                console.log('Error downloading speakers from API: ');
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
        SpeakerService.data.downloadFlag = true;
        updateSpeakerList();
    };
    
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
