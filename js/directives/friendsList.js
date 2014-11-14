angular.module('SteamAPI.directives.Friends', ['SteamAPI.providers.SteamAPI'])

.directive('steamFriend', function(){
  return {
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    templateUrl: 'templates/friends.html',
    transclude: true,
    link: function($scope) {
      
    }
  };
});