angular.module('SteamAPI.controllers.MainCtrl', ['SteamAPI.providers.SteamAPI', 'SteamAPI.providers.MiniProfile'])

.controller('MainCtrl', function($scope, steamAPI, miniProfile, towerAttack, $http) {

  //I cbf converting these on my own
  var oldValveIDs = [
    "76561197985607672",
    "76561197994632741",
    "76561197986943540",
    "76561197971049296",
    "76561197974807412",
    "76561197960265838",
    "76561197962783665",
    "76561197969363440",
    "76561197960434622",
    "76561197960265733",
    "76561197975724041",
    "76561197969357684",
    "76561198000175595",
    "76561197964279229",
    "76561197968575517",
    "76561197968459473",
    "76561197960563532",
    "76561197968282875",
    "76561197968662512",
    "76561198014254115",
    "76561197980258575",
    "76561197961301890",
    "76561197972196250",
    "76561197968729431",
    "76561198042665686",
    "76561197974593417",
    "76561198005615861",
    "76561197987393094",
    "76561197969518075",
    "76561197967144365",
    "76561197960435530",
    "76561197970892150",
    "76561197985627266",
    "76561197963156385",
    "76561197960860649",
    "76561197970282885",
    "76561197970565175",
    "76561197961420203",
    "76561197989577350",
    "76561197968452293",
    "76561197992219796",
    "76561198032822778",
    "76561197984751122",
    "76561197963997393",
    "76561197971951755",
    "76561197960265738",
    "76561197978236369",
    "76561197993060890",
    "76561198002212024",
    "76561197978266558",
    "76561197983311154",
    "76561197970323416",
    "76561197984981409",
    "76561197960265730",
    "76561197960265731",
    "76561197960265743",
    "76561197960265747",
    "76561197960265749",
    "76561197960269040",
    "76561197960287930",
    "76561197960402283",
    "76561197960423941",
    "76561197960549564",
    "76561197960789988",
    "76561197962313932",
    "76561197962833771",
    "76561197962844216",
    "76561197967377359",
    "76561197967713982",
    "76561197967990561",
    "76561197969262523",
    "76561197969321754",
    "76561197969400141",
    "76561197969720282",
    "76561197970280218",
    "76561197970285523",
    "76561197970533489",
    "76561197970543183",
    "76561197970634249",
    "76561197970893024",
    "76561197970968871",
    "76561197971292977",
    "76561197972291076",
    "76561197972563372",
    "76561197972755855",
    "76561197975593810",
    "76561197975914763",
    "76561197979082126",
    "76561197979187556",
    "76561197980632230",
    "76561197980865448",
    "76561197981291930",
    "76561197982227246",
    "76561197982261816",
    "76561197982460133",
    "76561197983819387",
    "76561197984437106",
    "76561197985130967",
    "76561197985590840",
    "76561197988042654",
    "76561197991157076",
    "76561197991390878",
    "76561197991751968",
    "76561197992467988",
    "76561197997296694",
    "76561197999000345",
    "76561198002151236",
    "76561198002402082",
    "76561197960269198",
    "76561198064672162",
    "76561197992681877",
    "76561198011246300",
    "76561198007657496",
    "76561197967346751",
    "76561198004406016",
    "76561197984212648",
    "76561197972491988",
    "76561197993404877",
    "76561198059223364",
    "76561197972903621",
    "76561197969266938",
    "76561197972495328",
    "76561198024402255",
    "76561198020213772",
    "76561198072330588",
    "76561198032818570",
    "76561198005121830",
    "76561198031529588",
    "76561198047404672",
    "76561198031872065",
    "76561198173852837",
    "76561198080912220",
    "76561197993832904",
    "76561197989728462",
    "76561197974091903",
    "76561198028203163",
    "76561198068030907",
    "76561198014674983",
    "76561198015999740",
    "76561198064584373",
    "76561197970530062",
    "76561197977436280",
    "76561197960277670",
    "76561197971400048",
    "76561197962413930",
    "76561198073160147",
    "76561198050715070",
    "76561198136526155",
    "76561198005731671",
    "76561197986183863",
    "76561197971217114",
    "76561198001549544",
    "76561198040900440",
    "76561198028573551",
    "76561198003204775",
    "76561197961165065",
    "76561198032490515",
    "76561198076175631",
    "76561198007695232",
    "76561198005331171",
    "76561198047817884",
    "76561197969765131",
    "76561197993032363",
    "76561198074940234",
    "76561197960508417",
    "76561197961218948",
    "76561197979124299",
    "76561198010062752",
    "76561198053546821",
    "76561197960265740",
    "76561198090691972",
    "76561198059694970",
    "76561197968694404",
    "76561198024187698",
    "76561198074191258",
    "76561197960265752",
    "76561197960389850",
    "76561197972370889",
    "76561197978854252",
    "76561197984750189",
    "76561197989808853",
    "76561197991564203",
    "76561197992637080",
    "76561197995557785",
    "76561197996448297",
    "76561197997728531",
    "76561198004986211",
    "76561198007564658",
    "76561198007696304",
    "76561198008486962",
    "76561198010168695",
    "76561198015260835",
    "76561198016352617",
    "76561198024119021",
    "76561198024119077",
    "76561198024119145",
    "76561198024119167",
    "76561198024119209",
    "76561198024119233",
    "76561198024119271",
    "76561198024119297",
    "76561198024149372",
    "76561198024149438",
    "76561198024468167",
    "76561198028024321",
    "76561198032743149",
    "76561198035422241",
    "76561198046379753",
    "76561198048142353",
    "76561198048263607",
    "76561198048619164",
    "76561198049584723",
    "76561198051124559",
    "76561198062070309",
    "76561198071493110",
    "76561198080174103",
    "76561198085177245",
    "76561198114561718",
    "76561198140935475"
  ];
  var newValveIDs = [];
  // Goes through each ID and converts to an ID we can use
  for (var i = 0; i < oldValveIDs.length; i++) {
    newValveIDs.push((oldValveIDs[i].substr(3) - 61197960265728))
  };

  $scope.apiKey = {
    steamApiKey: "",
    pSteamID: ""
  };
  
  $scope.minigame = {
    IGameID: '',
    ISteamID: '',
    IIncludeStats: 0
  };

  $scope.game_data = null;
  $scope.player_data = null;
  $scope.player_names = null;
  $scope.valve_employees = [];

  $scope.thingy = false;

  $scope.returnError = ['false', null];

  $scope.getGameData = function(gid) {
    towerAttack.getGameData(gid || $scope.minigame.IGameID, $scope.minigame.IIncludeStats).then(function(response) {
      if (response.game_data === undefined) {
        $scope.returnError = ['true', "unknown"];
        $scope.game_data = null;
        return;
      }
      $scope.game_data = response.game_data;

      $scope.returnError = ['false', null];
    }, function(err) {
        $scope.returnError = ['true', err];
    })
  };

  $scope.getPlayerData = function() {
    towerAttack.getPlayerData($scope.minigame.IGameID, $scope.minigame.ISteamID, $scope.minigame.IIncludeStats).then(function(response) {
      if (response.player_data === undefined) {
        $scope.returnError = ['true', "notthere"];
        $scope.player_data = null;
        return;
      }
      $scope.player_data = response.player_data;

      $scope.returnError = ['false', null];
    }, function(err) {
        $scope.returnError = ['true', err];
    })
  };

  $scope.getPlayerNames = function() {
    towerAttack.getPlayerNames($scope.minigame.IGameID).then(function(response) {
      if(response.names === undefined) {
        $scope.returnError = ['true', "unknown"];
        $scope.player_names = null;
        return;
      }
      $scope.player_names = response.names;

      if ($scope.player_names) {
        console.log("Crossmatching Valve IDs");
        angular.forEach($scope.player_names, function(player) {
         angular.forEach(newValveIDs, function(valveid) {
          if (player.accountid == valveid) {
            console.log("Found Valve Employee", player.name);
            player.isValve = true;
            player.name += " [Valve]";
          }
         })
        });
      }

      $scope.returnError = ['false', null];
    }, function(err) {
        $scope.returnError = ['true', err];
    })
  };

  $scope.findValveEmployees = function() {
    towerAttack.getTopRooms().then(function(rooms) {
      angular.forEach(rooms, function(room) {
        towerAttack.getPlayerNames(room).then(function(response) {
          angular.forEach(response.names, function(player) {
           angular.forEach(newValveIDs, function(valveid) {
            if (player.accountid == valveid) {
              console.log("Found Valve Employee", player.name);
              player.gameID = room;
              towerAttack.getGameData(player.gameID).then(function(response) {
                player.gameLevel = response.game_data.level;
              });
              $scope.valve_employees.push(player);
            }
           })
          });
        })
      })  
    });
  };

  $scope.getProfile = function() {
    steamAPI.getProfile($scope.apiKey.steamApiKey, $scope.apiKey.pSteamID).then(function(response) {
      if(response.data.response.players.length == 0) {
        $scope.returnError = ['true', 'invalid'];
        $scope.p_profile = null;
        return;
      }
      $scope.p_profile = response.data.response.players[0];
      miniProfile.getDetails($scope.apiKey.pSteamID).then(function(response) {
        $scope.p_profile.level = response.steamLevel;
        $scope.p_profile.badgename = response.badgeName;
        $scope.p_profile.badgeurl = response.badgeImg;
      })
      $scope.returnError = ['false', null];
    }, function(err) {
        $scope.returnError = ['true', err];
    })
  };

  $scope.getFriends = function() {
    steamAPI.getFriends($scope.apiKey.steamApiKey, $scope.apiKey.pSteamID).then(function(response) {
      $scope.friendslist = response.data.friendslist.friends;

      angular.forEach($scope.friendslist, function(friend) {
        steamAPI.getProfile($scope.apiKey.steamApiKey, friend.steamid).then(function(info) {
          friend.detailed = info.data.response.players[0];
        })
      })
      $scope.returnError = ['false', null];
    }, function(err) {
        $scope.returnError = ['true', err];
    })
  };

  $scope.getServers = function() {
    steamAPI.getServers($scope.apiKey.steamApiKey).then(function(response) {
      $scope.servers = response.data.response.servers;
      $scope.returnError = ['false', null];
    }, function(err) {
        $scope.returnError = ['true', err];
    })
  };

  $scope.getErrorMsg = function(err) {
    if(err.status == '403') {
      return "403 - Invalid API Key";
    }
    else if(err.status == '500') {
      return "500 - Invalid SteamID - Internal Server Error"
    }
    else if(err.status == '401') {
      return "401 - Private or Friends Only account - Unauthorized"
    }
    else if(err == 'invalid') {
      return "SteamID does not exist or correspond to an account"
    }
    else if(err == 'notthere') {
      return "A player with that ID doesn't appear to be in that room"
    }
    else if(err == 'unknown') {
      return "Not sure what went wrong :/"
    }
    else {
      return "Something went wrong, error code: "+err;
    }
  }
});