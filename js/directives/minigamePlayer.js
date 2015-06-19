angular.module('SteamAPI.directives.minigamePlayer', [])

.directive('minigamePlayer', function(){
  return {
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    templateUrl: 'templates/minigameplayer.html',
    transclude: true,
    link: function($scope) {
      
    }
  };
});