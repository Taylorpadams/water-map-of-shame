// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'ngCordova'])

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.controller('MainCtrl', function($scope, $http, $cordovaGeolocation, Camera) {
  $scope.report = {};
  $scope.report.date = new Date();
$scope.getLatLong=function(){
  console.log("getLatLong");
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $scope.report.latlong  = position.coords.latitude+","+position.coords.longitude;
      console.log(position);
    }, function(err) {
      // error
      console.log(err);
    });
}
   

   // Called when the form is submitted
  $scope.createReport = function(report) {
      console.log(report);
      
    
  //    // Simple POST request example (passing data) :
  // $http.post('http://192.168.0.100:3000/testreport', report).
  // then(function(response) {
  //   // this callback will be called asynchronously
  //   // when the response is available
  //   }, function(response) {
  //   // called asynchronously if an error occurs
  //   // or server returns response with an error status.
  // });
  };
  
  $scope.getPhoto = function() {
    Camera.getPicture({
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    }).then(function(imageURI) {
     // console.log(imageData);
      $scope.report.imageData =  imageURI;
      //$scope.report.lastPhoto = imageURI;
    }, function(err) {
      console.err(err);
    });
    /*
    navigator.camera.getPicture(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
    }, { 
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
    });
    */
  }

})
