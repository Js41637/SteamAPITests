/**
 * Handle global dependencies
 */
angular.module('SteamAPI', [
    'SteamAPI.providers.SteamAPI',
    'SteamAPI.providers.MiniProfile',
    'SteamAPI.controllers.MainCtrl',
    'SteamAPI.directives.Friends'
])
