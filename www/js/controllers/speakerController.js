eventkitApp.controller('speakerController', function ($scope, $state, SpeakerService) {
    
    $scope.speakers = [];
        console.log($scope.speakers);
    
    // @TODO: Run only from speakers.html not speaker.
    SpeakerService.getSpeakers().then(function(response){
        $scope.speakers = response.data;
        console.log($scope.speakers);
    });
    
    // For one speaker info page
    $scope.speakerId = $state.params.id;
});
