eventkitApp.factory('QuestionService', function ($http, CONST, LocalStorageService, UserService) {

    return {
        
        data: {
            // 'downloadFlag' is a used to avoid download data from API everytime the view is opened
            downloadFlag: true,
            // 'questions' keep all the questions throughout different controllers
            questions: []
        },
        
        /**
         * Returns a promise for all questions
         * @returns {promise}
         */
        downloadQuestions: function() {
            return $http({
                url: CONST.urlAPI + 'questions/session/1',
                method: "GET"
            });
        },
        
        /**
         * Send a new question to the server
         * Make sure that when calling this function the user is logged in.
         * @param {Object} questionData
         * @returns {promise}
         */
        sendNewQuestion: function(questionData) {
            var token = LocalStorageService.getLSValue(UserService.params, 'accessToken');

            return $http({
                url: CONST.urlAPI + 'questions',
                method: "POST",
                headers: {'Authorization': 'Bearer ' + token},
                data: questionData
            });
        } 
    };
});
