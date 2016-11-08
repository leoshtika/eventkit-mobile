eventkitApp.controller('questionController', function ($scope, $state, QuestionService) {
    
    console.log($state.params);
    
    $scope.questions = QuestionService.data.questions;
    
    // For one question info page
    $scope.questionId = $state.params.id;
    
    /**
     * Get all questions from API and copy to the list
     */
    var updateQuestionList = function() {
    
        // The following flag makes sure that the data from the API is downloaded only once
        if (QuestionService.data.downloadFlag) {
            QuestionService.downloadQuestions().then(function(response) {
                QuestionService.data.questions = angular.copy(response.data);
                $scope.questions = QuestionService.data.questions;
                QuestionService.data.downloadFlag = false;
                console.log($scope.questions);
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


    // Load only the first time, because the cache on the view is 'on'
    updateQuestionList();
});
