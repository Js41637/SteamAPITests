/**
 * Handle global dependencies
 */
angular.module('SteamAPI', [
    'SteamAPI.providers.SteamAPI',
    'SteamAPI.providers.MiniProfile',
    'SteamAPI.providers.TowerAttack',
    'SteamAPI.controllers.MainCtrl',
    'SteamAPI.directives.Friends',
    'SteamAPI.directives.minigamePlayer'
])