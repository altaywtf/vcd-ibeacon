angular.module('starter', ['ionic', 'ngCordovaBeacon'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function(){
    if(window.cordova && window.cordova.plugins.Keyboard){cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);}
    if(window.StatusBar) {StatusBar.styleDefault();}
  });
})

.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])

.controller("iBeaconController", function($scope, $http, $timeout, $rootScope, $ionicPlatform, $cordovaBeacon) {

  // TIMER --------------------------------- //
  $scope.counter = 600;
    var mytimeout = null; // the current timeoutID
    // actual timer method, counts down every second, stops on zero
    $scope.onTimeout = function() {
        if($scope.counter ===  0) {
            $scope.$broadcast('timer-stopped', 0);
            $timeout.cancel(mytimeout);
            return;
        }
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    $scope.startTimer = function() {
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    // stops and resets the current timer
    $scope.stopTimer = function() {
        $scope.$broadcast('timer-stopped', $scope.counter);
        $scope.counter = 0;
        $timeout.cancel(mytimeout);
    };
    // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
    $scope.$on('timer-stopped', function(event, remaining) {
        if(remaining === 0) {
            console.log('your time ran out!');
        }
    });

    $scope.startTimer();


  // GET REQUEST --------------------------------- //
  $scope.getData = function(){
    $http.get('http://188.166.115.68:9000/api/puzzle/567d1270bfdbffeb7eaa51a8')
    .then(
      function (response) { console.log('Success', response); $scope.puzzle = response.data; }, 
      function (err) { console.log('Error', err); }
    )
  };

  // PUT REQUEST --------------------------------- //
  $scope.putDataTrue = function(){
    $http.put('http://188.166.115.68:9000/api/puzzle/567d1270bfdbffeb7eaa51a8', {'isBeaconTwoFound':'true'})
    .then(
      function (response) { console.log('Success', response); },
      function (err) { console.log('Error', err); }
      )
  };

  $scope.putDataFalse = function(){
    $http.put('http://188.166.115.68:9000/api/puzzle/567d1270bfdbffeb7eaa51a8', {'isBeaconTwoFound':'false'})
    .then(
      function (response) { console.log('Success', response); },
      function (err) { console.log('Error', err); }
      )
  };

  // SERVER SPAM -------------------------------- //
  $scope.intervalFunction = function(){
    $timeout(function() {
      $scope.getData();
      $scope.intervalFunction();
    }, 1000)
  };

  $scope.intervalFunction();


  // BEACONS ------------------------------------ //
  $scope.beacons    = {};
  $scope.testField  = {};

  $ionicPlatform.ready(function() {

    $cordovaBeacon.requestWhenInUseAuthorization();
    
    $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
    
      var uniqueBeaconKey;

      // Scanning for Beacons
      for(var i = 0; i < pluginResult.beacons.length; i++){
        uniqueBeaconKey = pluginResult.beacons[i].uuid+":"+pluginResult.beacons[i].major+":"+pluginResult.beacons[i].minor;

        $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];

        if(pluginResult.beacons[i].accuracy <= 0.5 && pluginResult.beacons[i].accuracy != -1) {
          $scope.putDataTrue();
          $scope.testField[i] = 'putDataTrue';
        }

        else{
          $scope.putDataFalse();
          $scope.testField[i] = 'putDataFalse';
        }
      }

      $scope.$apply();
    
    });

    $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("s", "632AE8DD-8FA8-47EC-9EBC-F2FCB5C05F34"));

  });


});