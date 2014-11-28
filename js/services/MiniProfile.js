angular.module('SteamAPI.providers.MiniProfile', [])

/** 
 * Steam MiniProfile Praser
 */
.factory('miniProfile', function($http) {
  var endpoint = 'http://steamcommunity.com/miniprofile/%id%';

  /** 
   * Replace the ID in the url with the ID provided
   */ 
  var getUrl = function(id) {
    /**
     * Because of Steam and it's horribleness, MiniProfiles only accepts a users AccountID also known as Steam32ID 
     * however the SteamAPI only returns the already known Steam64ID so a manual conversion has to be done.
     * Steams other Old ID's were 'STEAM_0:X:Y' and the new IDs are '[U:1:Z]' where Z is (Y*2)+X these IDs seem to
     * correspond to the UID/Steam32ID, however yet again, Steams Old IDs are not returned from the API, only the 
     * Steam64ID is, some searching revealed this equation
     * While removing the first 3 numbers; Steam64ID - 61197960265728 = Steam32ID which is the UID required for MiniProfile
     */
    var uid = id.substr(3) - 61197960265728;
    return endpoint.replace('%id%', uid);
  };

  var praseResponse = function(profile) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(profile.data, "text/html");
    var level = doc.querySelectorAll(".friendPlayerLevelNum"), badge = doc.querySelectorAll("div.miniprofile_favorite_badge");
    var out = {
      steamLevel: level[0].innerText,
      badgeName: badge[0].querySelector('.favorite_badge_description .name').innerText,
      badgeImg: badge[0].querySelector('.favorite_badge_icon img').src,
    };
    return out;
  }

  var service = {
    getDetails: function(id) {
      return $http.get(getUrl(id)).then(function(response) {
        return praseResponse(response);
      });
    }
  };
  return service;
})