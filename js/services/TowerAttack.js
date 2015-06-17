angular.module('SteamAPI.providers.TowerAttack', [])

/** 
 * Steam TowerAttack API Interface
 */
.factory('towerAttack', function($http) {
  
  var endpoints = {
    gameData: 'http://steamapi-a.akamaihd.net/ITowerAttackMiniGameService/GetGameData/v0001/?gameid=%gid&include_stats=%stats',
    playerData: 'http://steamapi-a.akamaihd.net/ITowerAttackMiniGameService/GetPlayerData/v0001/?gameid=%gid&steamid=%sid&include_tech_tree=%stats',
    playerNames: 'http://steamapi-a.akamaihd.net/ITowerAttackMiniGameService/GetPlayerNames/v0001/?gameid=%gid'
  };

  /** 
   * Get one of the urls from the endpoint and replace the parameters in it when provided.
   */
  var getUrl = function(type, param, param2, param3) {
    var out = endpoints[type].replace('%gid', encodeURIComponent(param)).replace('%sid', encodeURIComponent(param2)).replace('%stats', encodeURIComponent(param3));
    return out;
  };

  var praseResponse = function(profile) {};

  var service = {
    getGameData: function(gId, stats) {
      return $http.get(getUrl("gameData", gId, undefined, stats)).then(function(response) {
        return response.data.response;
      });
    },
    getPlayerData: function(gId, sId, stats) {
      return $http.get(getUrl("playerData", gId, sId, stats)).then(function(response) {
        return response.data.response;
      });
    },
    getPlayerNames: function(gId) {
      return $http.get(getUrl("playerNames", gId, undefined, undefined)).then(function(response) {
        return response.data.response;
      });
    }
  };
  return service;
})