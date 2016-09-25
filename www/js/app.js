// eventkitApp is the main application module

var eventkitApp = angular.module('eventkitApp', ['ionic'])
    .constant('CONST', {
        urlAPI: 'http://localhost:4000/api/',
        urlFiles: 'http://localhost:4000/files4users/'
    });

eventkitApp.run(function ($ionicPlatform, UserService) {
    
    // Check if user is logged in and set the isLoggedIn params to true
    if(UserService.checkIfUserIsLoggedIn()){
        UserService.params.isLoggedIn = true;
    }
    
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'appController'
        })

        .state('app.event-info', {
            url: '/event-info',
            views: {
                'menuContent': {
                    templateUrl: 'templates/event-info.html'
                }
            }
        })
        
        .state('app.speakers', {
            url: '/speakers',
            views: {
                'menuContent': {
                    templateUrl: 'templates/speakers.html',
                    controller: 'speakerController'
                }
            }
        })

        .state('app.speaker', {
            url: '/speakers/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/speaker.html',
                    controller: 'speakerController'
                }
            }
        });
        
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/event-info');
});
