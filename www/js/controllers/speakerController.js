eventkitApp.controller('speakerController', function ($scope, $state, SpeakerService, CONST) {
    
    $scope.speakers = [];
    console.log($scope.speakers);

    // @TODO: Run only from speakers.html not speaker.
    SpeakerService.getSpeakers().then(function (response) {
        $scope.speakers = response.data;
        console.log($scope.speakers);
    });

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
});
