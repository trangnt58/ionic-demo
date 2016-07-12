angular.module('starter.controllers', [])

.controller('ToDoCtrl', function($scope, $ionicModal, $ionicPlatform, $ionicPopup, $cordovaSQLite) {

  $scope.loadTask = function() {
    var query = "SELECT * FROM Task;"
    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute(db, query).then(function(data) {
        $scope.tasks=[];
        for (var i = 0; i < data.rows.length; i++) {
          var taskItem = {};
          taskItem.task_id = data.rows.item(i).task_id;
          taskItem.task_name = data.rows.item(i).task_name;
          $scope.tasks.push(taskItem);
        }        
      }, function (err) {
          console.error(err);
      });
    });

  };
  $scope.loadTask(); 

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });


  // Open our new task modal
  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };


  //Create a task
  $scope.createTask = function(task) {
        var query = "INSERT INTO Task (task_name) VALUES (?);";
        $cordovaSQLite.execute(db, query, [task.task_name]).then(function(res) {
            $scope.loadTask(); 
            $scope.taskModal.hide();
        }, function (err) {
          console.error(err);
        });
    
  }
})

.controller('MusicCtrl', function($scope, Chats, $ionicPlatform, $cordovaMedia, $cordovaNativeAudio, $timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
$ionicPlatform.ready(function() {
      
      $cordovaNativeAudio
        .preloadSimple('click', 'audio/demon.mp3')
        .then(function (msg) {
          console.log(msg);
        }, function (error) {
          alert(error);
        });

      $cordovaNativeAudio
        .preloadComplex('click', 'audio/demon.mp3', 1, 1)
        .then(function (msg) {
          console.log(msg);
        }, function (error) {
          console.error(error);
        });

      $scope.play = function () {
        $cordovaNativeAudio.play('click');
      };

      $scope.stop = function() {
        $cordovaNativeAudio.stop('click');
      }

      $scope.loopAudio = function () {
         $cordovaNativeAudio.loop('click');
         $timeout(function () {
            $cordovaNativeAudio.stop('click');
            $cordovaNativeAudio.unload('click');
         }, 5000);
      }


   });
  

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('MusicDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('PhotoCtrl', function($scope, $ionicPlatform, $cordovaSQLite) {

  $scope.prePhoto = function() {
    var photoSource = [
      {
        photo_url: 'img/avatar1.png'
      },
      {
        photo_url: 'img/avatar2.jpg'
      },
      {
        photo_url: 'img/avatar3.jpg'
      },
       {
        photo_url: 'img/avatar4.jpg'
      },
    ];
    for( var i = 0; i < photoSource.length; i ++ ) {
      var query = "INSERT INTO Photo (photo_url) VALUES (?);";
      $cordovaSQLite.execute(db, query, [photoSource[i].photo_url]).then(function(res) {
      }, function (err) {
          console.error(err);
      });
    }
    

  };
  $scope.prePhoto(); 

   $scope.loadPhoto = function() {
    $scope.photos = [];
    var query = "SELECT * FROM Photo;"
      $cordovaSQLite.execute(db, query).then(function(data) {
        for (var i = 0; i < data.rows.length; i++) {
          var photoItem = {};
          photoItem.photo_id = data.rows.item(i).photo_id;
          photoItem.photo_url = data.rows.item(i).photo_url;
          $scope.photos.push(photoItem);
        }        
      }, function (err) {
          console.error(err);
      });

  };
  $scope.loadPhoto(); 



})

.controller('PhotoDetailCtrl', function($scope, $stateParams, $cordovaSQLite) {
  var photoId = parseInt($stateParams.photoId);
  $scope.photo = {};

  $scope.findPhoto = function() {
    var query = "SELECT * FROM Photo WHERE photo_id = ?;"
      $cordovaSQLite.execute(db, query, [photoId]).then(function(data) {
        $scope.photo = data.rows.item(0);
      }, function (err) {
          console.error(err);
      });


  }
  $scope.findPhoto();
});
