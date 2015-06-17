angular.module('SteamAPI.controllers.MainCtrl', ['SteamAPI.providers.SteamAPI', 'SteamAPI.providers.MiniProfile'])

.controller('MainCtrl', function($scope, steamAPI, miniProfile, towerAttack) {

  $scope.steamApiKey = "";
  $scope.pSteamID = "";

  $scope.thingy = false;

  $scope.returnError = ['false', null];

  $scope.shit = {
    IGameID: '',
    ISteamID: '',
    IIncludeStats: 0
  };

  $scope.game_data = null;
  $scope.player_data = null;
  $scope.player_names = null;

  $scope.getGameData = function() {
    towerAttack.getGameData($scope.shit.IGameID, $scope.shit.IIncludeStats).then(function(response) {
      if(response.game_data === undefined) {
        $scope.returnError = ['true', "unknown"];
        $scope.game_data = null;
        return;
      }
      $scope.game_data = response.game_data;

      $scope.returnError = ['false', null];
    }, function(err) {
        $scope.returnError = ['true', err];
    })
  };

  $scope.getPlayerData = function() {
    towerAttack.getPlayerData($scope.shit.IGameID, $scope.shit.ISteamID, $scope.shit.IIncludeStats).then(function(response) {
      if(response.player_data === undefined) {
        $scope.returnError = ['true', "notthere"];
        $scope.player_data = null;
        return;
      }
      $scope.player_data = response.player_data;

      $scope.returnError = ['false', null];
    }, function(err) {
        $scope.returnError = ['true', err];
    })
  };

  $scope.getPlayerNames = function() {
    towerAttack.getPlayerNames($scope.shit.IGameID).then(function(response) {
      if(response.names === undefined) {
        $scope.returnError = ['true', "unknown"];
        $scope.player_names = null;
        return;
      }
      $scope.player_names = response.names;

      $scope.returnError = ['false', null];
    }, function(err) {
        $scope.returnError = ['true', err];
    })
  };

  $scope.getProfile = function() {
    steamAPI.getProfile($scope.steamApiKey, $scope.pSteamID).then(function(response) {
      if(response.data.response.players.length == 0) {
        $scope.returnError = ['true', 'invalid'];
        $scope.p_profile = null;
        return;
      }
      $scope.p_profile = response.data.response.players[0];
      miniProfile.getDetails($scope.pSteamID).then(function(response) {
        $scope.p_profile.level = response.steamLevel;
        $scope.p_profile.badgename = response.badgeName;
        $scope.p_profile.badgeurl = response.badgeImg;
      })
      $scope.returnError = ['false', null];
    }, function(err) {
        $scope.returnError = ['true', err];
    })
  };

  $scope.getFriends = function() {
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

  $scope.getServers = function() {
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
    else if(err == 'notthere') {
      return "A player with that ID doesn't appear to be in that room"
    }
    else if(err == 'unknown') {
      return "Not sure what went wrong :/"
    }
    else {
      return "Something went wrong, error code: "+err;
    }
  }
});