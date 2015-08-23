// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'ngCordova'])

  .config(function ($compileProvider, $stateProvider, $httpProvider, $urlRouterProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|data):/);
    $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
  })

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .controller('MainCtrl', function ($scope, $state, $http, $cordovaGeolocation, Camera, $ionicPopup) {
    $scope.report = {};
    $scope.report.date = new Date();
    $scope.getLatLong = function () {
      console.log("getLatLong");
      var posOptions = { timeout: 10000, enableHighAccuracy: false };
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          $scope.report.latlong = position.coords.latitude + "," + position.coords.longitude;
          console.log(position);
        }, function (err) {
          // error
          console.log(err);
        });
    }
   

    // Called when the form is submitted
    $scope.createReport = function (report) {

     

      // window.resolveLocalFileSystemURI(report.imageData, function(fileEntry) {
      //       alert("file entry: "+JSON.stringify(fileEntry));
      //       alert("filed entry url: "+fileEntry.toURL());
      //       fileEntry.file(function(fileObj) {
      //         alert("file obj: "+JSON.stringify(fileObj));
               
      //           //now use the fileName in your method
      //           //ft.upload(fileName ,serverURL + '/ajax.php?fname=appuploadspotimage'...);

      //       });
      //   });
      var lat = report.latlong.substring(0, report.latlong.indexOf(","));
      var long = report.latlong.substring(report.latlong.indexOf(",") + 1);
      //var imageDataUrl = encodeImageUri($scope.report.imageData);
      var feature = {
        "geometry": { "x": long, "y": lat },
        "attributes": {
          type: report.type,
          category: report.category,
          description: report.description,
          date: report.date,
          imageurl: "http://www.cityofhenderson.com/images/default-source/utility-services/water_waste.jpg?sfvrsn=2",
          isPublished: 0
        }
      };

      var features = [];
      features.push(feature);
      console.log(features);
      //Simple POST request example (passing data) :
      $http.post('http://services6.arcgis.com/IjlJ3SNhNad1djSr/arcgis/rest/services/Water_Wastage/FeatureServer/0/addFeatures?features=' + encodeURIComponent(JSON.stringify(features)) + '&f=json', null).
        then(function (response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(JSON.stringify(response));
          var objectId = response.data.addResults[0].objectId;
          
             var alertPopup = $ionicPopup.alert({
              title: 'Submittied Complaint',
              template: "Submitted!!!"
            });
            alertPopup.then(function (res) {
              //$state.report = {};
            });
           var uri = 'http://services6.arcgis.com/IjlJ3SNhNad1djSr/arcgis/rest/services/Water_Wastage/FeatureServer/0/' + objectId + '/addAttachment&f=json';
    //      var fd = new FormData();
   // var blob = b64toBlob(report.imageData.replace("data:image/jpeg;base64,", ""), 'image/jpg');
   // fd.append("attachment", blob, "userImage.jpg");
    //      $http.post(uri, fd, {
    //         transformRequest: angular.identity,
    //         headers: {'Content-Type': undefined}
    //     })
    //     .then(function(response){
    //       alert(JSON.stringify(response));
    //     }, function(response){
    //         alert(JSON.stringify(response));
    //     });
     
        
          // function win(r) {
          //   console.log("Code = " + r.responseCode);
          //   console.log("Response = " + r.response);
          //   console.log("Sent = " + r.bytesSent);
            
         

          // }

        //   function fail(error) {
        //     alert("An error has occurred: Code = " + error.code);
        //     console.log("upload error source " + error.source);
        //     console.log("upload error target " + error.target);
        //   }
        //   var options = new FileUploadOptions();
        //   options.fileKey = "attachment";
        //   options.fileName = report.imageData.substr(report.imageData.lastIndexOf('/')+1);
        //   alert(options.fileName);
        //   options.mimeType="image/jpg";  
        // //  var headers = { };
        //   options.headers =null;
        //   options.chunkedMode = true;
        //   options.httpMethod="POST";
        //   alert(JSON.stringify(options));
        //   var ft = new FileTransfer();
        //   alert("uri: "+uri);
        //    window.resolveLocalFileSystemURI(report.imageData, function(fileEntry) {
        //               alert("file url: "+fileEntry.toURL());
        //                fileEntry.file(function(fileObj) {

                          

        //         //now use the fileName in your method
        //           //ft.upload(fileName ,serverURL + '/ajax.php?fname=appuploadspotimage'...);
        //                  ft.upload(fileObj.localURL, uri, win, fail, options, true);
        //     });

        //     });       
        }, function (response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log(JSON.stringify(response));
        });
    };

    function encodeImageUri(imageUri) {
      var c = document.createElement('canvas');
      var ctx = c.getContext("2d");
      var img = new Image();
      img.onload = function () {
        c.width = this.width;
        c.height = this.height;
        ctx.drawImage(img, 0, 0);
      };
      img.src = imageUri;
      var dataURL = c.toDataURL("image/jpeg");
      return dataURL;
    }
   function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

    $scope.getPhoto = function () {
      Camera.getPicture({
        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: false,
        //destinationType: 0
      }).then(function (imageURI) {
        // console.log(imageData);
       // alert(imageData);

        $scope.report.imageData = imageURI;
        //$scope.report.lastPhoto = imageURI;
      }, function (err) {
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
