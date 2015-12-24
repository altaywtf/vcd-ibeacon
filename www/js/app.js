// call the angular module 'starter', 'ionic' and 'ngCordovaBeacon'
angular.module('starter', ['ionic', 'ngCordovaBeacon'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function(){
    if(window.cordova && window.cordova.plugins.Keyboard){
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("ExampleController", function($scope, $rootScope, $ionicPlatform, $cordovaBeacon) {

  // create beacon scope
  $scope.beacons = {

  };

  // when ionic platform is rdy
  $ionicPlatform.ready(function() {

    // ??
    $cordovaBeacon.requestWhenInUseAuthorization();
    
    // start looking for beacons in region
    $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
      
      // append found uniquebeaconkeys to this variable
      var uniqueBeaconKey;

      for(var i = 0; i < pluginResult.beacons.length; i++){
        uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
        $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
      }

      $scope.$apply();
    
    });

    $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "b9407f30-f5f8-466e-aff9-25556b57fe6d"));

  });
});