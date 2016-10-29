eventkitApp.factory('QuestionService', function ($http, CONST) {

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
        }        
    };
});
