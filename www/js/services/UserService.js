eventkitApp.factory('UserService', function ($http, LocalStorageService, CONST) {

    return {
        
        /**
         * Local storage params (key, defaultValues)
         */
        params: {
            storageKey: 'eventkit_user',
            defaultValues: {
                accessToken: null,
                fullName: null
            },
            isLoggedIn: false
        },
        
        /**
         * Login user
         * @param {array} loginData
         * @returns {promise}
         */
        loginUser: function(loginData){
            return $http.post(CONST.urlAPI + 'user/login', loginData);
        },
        
        /**
         * Check if the accessToken exists in local storage
         * @returns {Boolean}
         */
        checkIfUserIsLoggedIn: function(){
            if (LocalStorageService.getLSValue(this.params, 'accessToken') !== null) {
                return true;
            } else {
                return false;
            }
        },
        
        /**
         * Returns the full name of the logged in user or an empty string if the user is not logged in
         * @returns {String}
         */
        getFullName: function() {
            return   this.isLoggedIn ? LocalStorageService.getLSValue(this.params, 'fullName') : "";
        },
        
        /**
         * Get the user account information from the API.
         * Make sure that when calling this function the user is logged in.
         * @returns {promise}
         */
        getUserAccount: function() {
            var token = LocalStorageService.getLSValue(this.params, 'accessToken');

            return $http({
                url: CONST.urlAPI + 'user/account',
                method: "GET",
                headers: {'Authorization': 'Bearer ' + token}
            });
        }        
    };
});
