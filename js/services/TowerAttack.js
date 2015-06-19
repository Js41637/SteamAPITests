angular.module('SteamAPI.providers.TowerAttack', [])

/** 
 * Steam TowerAttack API Interface
 */
.factory('towerAttack', function($http) {
  
  var endpoints = {
    gameData: 'http://steamapi-a.akamaihd.net/ITowerAttackMiniGameService/GetGameData/v0001/?gameid=%gid&include_stats=%stats',
    playerData: 'http://steamapi-a.akamaihd.net/ITowerAttackMiniGameService/GetPlayerData/v0001/?gameid=%gid&steamid=%sid&include_tech_tree=%stats',
    playerNames: 'http://steamapi-a.akamaihd.net/ITowerAttackMiniGameService/GetPlayerNames/v0001/?gameid=%gid',
    // Sorry xPaw :)
    topRooms: 'https://lab.xpaw.me/towerattack.php'
  };

  /** 
   * Get one of the urls from the endpoint and replace the parameters in it when provided.
   */
  var getUrl = function(type, param, param2, param3) {
    var out = endpoints[type].replace('%gid', encodeURIComponent(param)).replace('%sid', encodeURIComponent(param2)).replace('%stats', encodeURIComponent(param3));
    return out;
  };

  var praseTopRooms = function(rooms) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(rooms.data, "text/html");
    var rooms = doc.querySelectorAll('tbody tr');
    var length = rooms.length > 150 ? 150 : rooms.length;
    var output = [];
    //Limit to Top 150
    for (var i = 0; i < length; i++) {
      output.push(rooms[i].querySelector('td:nth-of-type(2)').innerText.replace(/\s+/g, ''));
    }
    
    return output;
  }

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
    },
    getTopRooms: function() {
      return $http.get(getUrl("topRooms", undefined, undefined, undefined)).then(function(response) {
        return praseTopRooms(response);
      })
    }
  };
  return service;
})