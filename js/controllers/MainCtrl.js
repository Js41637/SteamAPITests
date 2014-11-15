angular.module('SteamAPI.controllers.MainCtrl', ['SteamAPI.providers.SteamAPI'])

.controller('MainCtrl', function($scope, steamAPI) {

  $scope.steamApiKey = "";
  $scope.pSteamID = "";

  $scope.returnError = ['false', null];

  $scope.getProfile = function(){
    steamAPI.getProfile($scope.steamApiKey, $scope.pSteamID).then(function(response) {
      if(response.data.response.players.length == 0) {
        $scope.returnError = ['true', 'invalid'];
        $scope.p_profile = null;
        return;
      }
      $scope.p_profile = response.data.response.players[0];
      $scope.returnError = ['false', null];
    }, function(err) {
        $scope.returnError = ['true', err];
    })
  };

  $scope.getFriends = function(){
    steamAPI.getFriends($scope.steamApiKey, $scope.pSteamID).then(function(response) {
      $scope.friendslist = response.data.friendslist.friends;

      angular.forEach($scope.friendslist, function(friend) {
        steamAPI.getProfile($scope.steamApiKey, friend.steamid).then(function(info) {
          friend.detailed = info.data.response.players[0];
        })
      })
      $scope.returnError = ['false', null];
    }, function(err) {
        $scope.returnError = ['true', err];
    })
  };

  $scope.getServers = function(){
    steamAPI.getServers($scope.steamApiKey).then(function(response) {
      $scope.servers = response.data.response.servers;
      $scope.returnError = ['false', null];
    }, function(err) {
        $scope.returnError = ['true', err];
    })
  };

  $scope.getErrorMsg = function(err) {
    if(err.status == '403') {
      return "403 - Invalid API Key";
    }
    else if(err.status == '500') {
      return "500 - Invalid SteamID - Internal Server Error"
    }
    else if(err.status == '401') {
      return "401 - Private or Friends Only account - Unauthorized"
    }
    else if(err == 'invalid') {
      return "SteamID does not exist or correspond to an account"
    }
    else {
      return "Something went wrong, error code: "+err;
    }
  }
});