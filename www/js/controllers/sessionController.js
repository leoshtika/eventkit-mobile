eventkitApp.controller('sessionController', function ($scope, $state, $ionicModal, $ionicLoading, $ionicPopup, SessionService, QuestionService, CONST) {
    
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
        
        // Show loader
        $ionicLoading.show({
            template: 'Loading. Please wait...' +
                        '<br><br>' +
                        '<ion-spinner></ion-spinner>',
            scope: $scope,
            showBackdrop: true,
            showDelay: 100
        });
        
        QuestionService.sendNewQuestion($scope.questionData).then(function(response){
            
            $ionicPopup.alert({
                title: 'New questtion',
                template: '<i class="icon ion-ios-information balanced icon_popup_template"></i>' +
                        'Congratulation! Your question was successfully sent.'
            });
            
            $scope.closeQuestionModal();
            
        }, function(response){
            
            // Default error message
            var errorMessage = 'An error occured, please try again later.';
            
            if (response.data !== null) {
                // authorization error
                if (typeof response.data.message !== 'undefined') {
                    errorMessage = response.data.message;
                }
                
                // validation error
                if (typeof response.data[0] !== 'undefined') {
                    errorMessage = response.data[0].message;
                }
            } else {
                // API is not available
                errorMessage = 'Could not connect to the server. Please check your network connection and try again.';
            }
            
            $ionicPopup.alert({
                title: 'New question failed!',
                template: '<i class="icon ion-ios-information assertive icon_popup_template"></i>' +
                        errorMessage
            });
            
        }).finally(function(){
            // hide loader
            $ionicLoading.hide();
        });
    };
    // ---------------------------- Ask a question --

    // Load only the first time, because the cache on the view is 'on'
    updateSessionList();
});
