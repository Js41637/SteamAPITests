angular.module('SteamAPI.providers.SteamAPI', [])

/** 
 * Steam API Endpoint
 */
.factory('steamAPI', function($http) {
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