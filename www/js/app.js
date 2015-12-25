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
  $scope.beacons = {};

  // when ionic platform is rdy
  $ionicPlatform.ready(function() {

    // ???
    $cordovaBeacon.requestWhenInUseAuthorization();
    
    // start looking for beacons in region
    $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
      
      // create a uniqueBeaconKey for each Beacon by using their uuid, major and minor values.
      var uniqueBeaconKey;

      for(var i = 0; i < pluginResult.beacons.length; i++){
        uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
        
        $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
      }

      $scope.$apply();
    
    });

    $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("sensoro", "23A01AF0-232A-4518-9C0E-323FB773F5EF"));
    $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("sensoro2", "632AE8DD-8FA8-47EC-9EBC-F2FCB5C05F34"));

  });
});