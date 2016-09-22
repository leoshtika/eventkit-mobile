// eventkitApp is the main application module

var eventkitApp = angular.module('eventkitApp', ['ionic']);

eventkitApp.run(function ($ionicPlatform) {
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
                    controller: 'SpeakersController'
                }
            }
        })

        .state('app.speaker', {
            url: '/speakers/:speakerId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/speaker.html',
                    controller: 'SpeakersController'
                }
            }
        });
        
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/event-info');
});
