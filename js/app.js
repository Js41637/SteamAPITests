/**
 * Handle global dependencies
 */
angular.module('SteamAPI', [
    'SteamAPI.providers.SteamAPI',
    'SteamAPI.controllers.MainCtrl',
    'SteamAPI.directives.Friends'
])

.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
})

/**
 * Set up the xml interceptor and whitelist the chrome extension's filesystem and magnet links
 */
.config(function($httpProvider, $compileProvider) {

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|blob|mailto|chrome-extension|magnet|data|file):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file):|data:image|filesystem:chrome-extension:/);
})