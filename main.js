var app = angular.module('steamtrade', [])

app.controller('MainCtrl', function($scope, steamAPI) {

  $scope.steamApiKey = "";
  $scope.pSteamID = "";

  $scope.returnError = ['false', null];

  $scope.getProfile = function(){
    steamAPI.getProfile($scope.steamApiKey, $scope.pSteamID).then(function(response) {
      $scope.p_profile = response.data.response.players[0];
      $scope.returnError = ['false', null];
    }, function(err) {
        $scope.returnError = ['true', err];
    })
  };

  $scope.getFriends = function(){
    steamAPI.getFriends($scope.steamApiKey, $scope.pSteamID).then(function(response) {
      $scope.friendslist = response.data.friendslist.friends;
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


  
/**
  $scope.getServers = function() {
    $http.get("https://api.steampowered.com/IGameServersService/GetAccountList/v0001/?key="+$scope.steamApiKey+"&format=json").then(
      function(response) {
        $scope.servers = response.data.response.servers;
        $scope.returnError = ['false', null];
      }, function(err) {
        $scope.returnError = ['true', err];
        console.log($scope.returnError);
      }
    );
  };


  $scope.getFriends = function() {
    $http.get("http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key="+$scope.steamApiKey+"&steamid="+$scope.pSteamID).then(
      function(response) {
        $scope.friends = response.data.friendslist.friends;
        console.log(response.data.friendslist.friends)
        $scope.returnError = ['false', null];
      }, function(err) {
        $scope.returnError = ['true', err];
        console.log($scope.returnError);
      }
    );
  };
  

  $scope.getProfile = function() {
    $http.get("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+$scope.steamApiKey+"&steamids="+$scope.pSteamID).then(
      function(response) {
        //Returns array of SteamIDs but in this case, we're only requesting one
        //so we need to select the first (and only) one with [0]
        $scope.myProfile = response.data.response.players[0];
        $scope.returnError = ['false', null];
      }, function(err) {
        $scope.returnError = ['true', err];
        console.log($scope.returnError);
      }
    );
  };
*/
  $scope.getErrorMsg = function(err) {
    if(err == '403') {
      return "403 - Invalid API Key";
    }
    if(err == '500') {
      return "500 - Invalid SteamID - Internal Server Error"
    }
    if(err == '401') {
      return "401 - Private or Friends Only account - Unauthorized"
    }
    else {
      return "Something went wrong, error code: "+err;
    }
  }
});

app.directive('steamFriend', function(){
  return {
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    templateUrl: 'friends.html',
    transclude: true,
    link: function($scope) {
      
    }
  };
});

/** 
 * Steam API Endpoint
 */
app.factory('steamAPI', function($q, $http){

  var endpoints = {
    servers: 'https://api.steampowered.com/IGameServersService/GetAccountList/v0001/?key=%key%',
    friendslist: 'http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=%key%&steamid=%ids%',
    playersummary: 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=%key%&steamids=%ids%'
  };

  /** 
   * Get one of the urls from the endpoint and replace the parameters in it when provided.
   */ 
  var getUrl = function(type, apikey, ids) {
    var out = endpoints[type].replace('%key%', apikey);
    if(ids !== undefined) out = out.replace('%ids%', ids);
    return out;
  };

  var service = {
    getFriends: function(apikey, steamids) {
      return $http.get(getUrl('friendslist', apikey, steamids));
    },
    getServers: function(apikey) {
      return $http.get(getUrl('servers', apikey));
    },
    getProfile: function(apikey, steamids) {
      return $http.get(getUrl('playersummary', apikey, steamids));
    }
  };
  return service;
})