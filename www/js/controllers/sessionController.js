eventkitApp.controller('sessionController', function ($scope, $state, $ionicModal, SessionService, QuestionService, CONST) {
    
    $scope.sessions = SessionService.data.sessions;
    
    // For one session info page
    $scope.sessionId = $state.params.id;
    
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
    
    // -- Ask a question ----------------------------
    // Initialize data for the question modal
    $scope.questionData = {
        'session_id': $scope.sessionId
    };
    
    // Create the question modal
    $ionicModal.fromTemplateUrl('templates/ask-question-modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.questionModal = modal;
    });
    
    // Open the question modal
    $scope.openQuestionModal = function () {
        $scope.questionModal.show();
    };
    
    // Close question modal
    $scope.closeQuestionModal = function () {
        $scope.questionModal.hide();
    };

    // Send the question to the server 
    $scope.askQuestion = function () {
        QuestionService.sendNewQuestion($scope.questionData).then(function(response){
            console.log('Question was sent');
            console.log(response);
        }, function(err){
            // validation error
            if (err.status === 422){
                alert(err.data[0].message);
            } else {
                alert (err.data.message);
            }
        });
    };
    // ---------------------------- Ask a question --

    // Load only the first time, because the cache on the view is 'on'
    updateSessionList();
});
