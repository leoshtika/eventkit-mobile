eventkitApp.controller('SpeakersController', function ($scope, $state) {
    $scope.speakers = [
        {name: 'Leonard Shtika', id: 1},
        {name: 'John Smith', id: 2},
        {name: 'Ashlee Atienza ', id: 3},
        {name: 'Fernando Flinchum ', id: 4},
        {name: 'Kate Benigno', id: 5},
        {name: 'Eulalia Reddin', id: 6}
    ];
    
    // For one speaker info page
    $scope.speakerId = $state.params.id;
});