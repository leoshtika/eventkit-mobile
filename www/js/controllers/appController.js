eventkitApp.controller('appController', function ($scope, $ionicModal, $ionicLoading, $ionicPopup, $ionicHistory, UserService, LocalStorageService) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    

    // Get the values of all params
    $scope.userParams = UserService.params;
    
    /**
     * Download details for this user (number of reports, comments, likes ...)
     */
    var refreshProfile = function() {
        if (UserService.params.isLoggedIn) {
            UserService.getUserAccount().then(function (allItems) {
                $scope.userAccount = allItems.data;
            }, function (response) {
                if (response.data === null) {
                    $scope.userAccount = {
//                        avatar_url: 'img/avatar-default.png',
                        full_name: LocalStorageService.getLSValue(UserService.params, 'fullName')
                    };
                }
            });
        }
    };
    
   // This event runs everytime the view has finished loading
    $scope.$on('$ionicView.afterEnter', function(e) {
        if (UserService.params.isLoggedIn && $scope.userAccount === undefined) {
            refreshProfile();
        }
    });

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.LoginModal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLoginModal = function () {
        $scope.LoginModal.hide();
    };

    // Open the login modal
    $scope.openLoginModal = function () {
        $scope.LoginModal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        
        // Show loader
        $ionicLoading.show({
            template: 'Loading. Please wait...' +
                        '<br><br>' +
                        '<ion-spinner></ion-spinner>',
            scope: $scope,
            showBackdrop: true,
            showDelay: 100
        });
        
        UserService.loginUser($scope.loginData).then(function(response){
            LocalStorageService.setLSValue(UserService.params, 'accessToken', response.data.access_token);
            LocalStorageService.setLSValue(UserService.params, 'fullName', response.data.full_name);
            UserService.params.isLoggedIn = true;
            
            $ionicPopup.alert({
                title: 'Login successful!',
                template: '<i class="icon ion-ios-information balanced icon_popup_template"></i>' +
                        'Congratulation! You have successfully logged in.'
            });
            
            // Download details for this user
            refreshProfile();
            
            $scope.closeLoginModal();
            
        }, function(response){
            // failure call back
            var errorMessage = '';
            
            // When API is not available it response.data is null
            if (response.data !== null) {
                if (typeof response.data[0] !== 'undefined') {
                    errorMessage = response.data[0].message;
                }
            } else {
                errorMessage = 'Could not connect to the server. Please check your network connection and try again.';
            }
            
            $ionicPopup.alert({
                title: 'Login failed!',
                template: '<i class="icon ion-ios-information assertive icon_popup_template"></i>' +
                        errorMessage
            });
        }).finally(function(){
            // hide loader
            $ionicLoading.hide();
        });
    };
    
    
    // Logout user and clean up
    $scope.logout = function(){
        
        // Remove local storage items
        LocalStorageService.removeItem(UserService.params);
        
        // Reset $scope variables
        $scope.userAccount = null;
        
        // Reset params
        UserService.params.isLoggedIn = false;

        // @TODO:Truncate database table
        
        // Clear cache
        $ionicHistory.clearCache();
    };
    
});
