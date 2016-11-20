eventkitApp.controller('questionController', function ($scope, $state, $ionicModal, $ionicPopup, $ionicLoading, QuestionService, SessionService) {
    
    $scope.questions = QuestionService.data.questions;
    
    // Get sessionId from URL params
    $scope.sessionId = $state.params.sid;
    
    /**
     * Get all questions from API and copy to the list
     */
    var updateQuestionList = function() {
    
        // The following flag makes sure that the data from the API is downloaded only once
        if (QuestionService.data.downloadFlag) {
            QuestionService.downloadQuestions($scope.sessionId).then(function(response) {
                QuestionService.data.questions = angular.copy(response.data);
                $scope.questions = QuestionService.data.questions;
                QuestionService.data.downloadFlag = false;
            }, function(err) {
                console.log('Error downloading questions from API: ');
                console.log(err.message);
            })
            .finally(function(){
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    };
    
    var getSessionTitle = function(){
        var sessionDetails = null;
        angular.forEach(SessionService.data.sessions, function(session){
            if (session.id === $scope.sessionId) {
                sessionDetails = session;
            }
        });
        return sessionDetails.title;
    };
    
    $scope.sessionTitle = function(){
        return getSessionTitle();
    };
    
    /**
     * Download data again from the API
     */
    $scope.doRefresh = function () {
        QuestionService.data.downloadFlag = true;
        updateQuestionList();
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
                title: 'New question',
                template: '<i class="icon ion-ios-information balanced icon_popup_template"></i>' +
                        'Congratulation! Your question was successfully sent.'
            });
            
            // reset questionData
            $scope.questionData.question = '';
            
            // close modal
            $scope.closeQuestionModal();
            
            // reload questions
            $scope.doRefresh();
            
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
    updateQuestionList();
});
