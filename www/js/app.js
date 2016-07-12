// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db;
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // Important!!
    // 
    // Instantiate database file/connection after ionic platform is ready.
    //
    if (window.cordova) {
      db = $cordovaSQLite.openDB({ name: "demo.db", location: 1}); //device
    }else{
      db = window.openDatabase("demo.db", '1', 'demo', 1024 * 1024 * 100); // browser
    }
        
    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Task (task_id INTEGER PRIMARY KEY AUTOINCREMENT, task_name TEXT)');
    $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS Photo ;');
    $cordovaSQLite.execute(db, 'CREATE TABLE Photo (photo_id INTEGER PRIMARY KEY AUTOINCREMENT, photo_url TEXT)');
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.todo', {
    url: '/todo',
    views: {
      'tab-todo': {
        templateUrl: 'templates/tab-todo.html',
        controller: 'ToDoCtrl'
      }
    }
  })

  .state('tab.music', {
    url: '/music',
    views: {
        'tab-music': {
          templateUrl: 'templates/tab-music.html',
          controller: 'MusicCtrl'
        }
      }
  })
  .state('tab.music-detail', {
      url: '/music/:chatId',
      views: {
        'tab-music': {
          templateUrl: 'templates/music-detail.html',
          controller: 'MusicDetailCtrl'
        }
      }
  })

  .state('tab.photo', {
    url: '/photo',
    views: {
      'tab-photo': {
        templateUrl: 'templates/tab-photo.html',
        controller: 'PhotoCtrl'
      }
    }
  })
  .state('tab.photo-detail', {
    url: '/photo/:photoId',
    views: {
      'tab-photo': {
        templateUrl: 'templates/photo-detail.html',
        controller: 'PhotoDetailCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/todo');

});
