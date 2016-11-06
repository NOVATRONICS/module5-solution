(function () {

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['menuItems','UserService','MenuService','$q','$state','$timeout'];
function RegistrationController(menuItems, UserService, MenuService, $q, $state, $timeout) {
  var reg = this;

  reg.favInvalid = false;
  //reg.menuItems = menuItems.menu_items;
  reg.user = {};
  reg.user.favItems = [];

  function checkValidItem(short_name) {
    var item = {short_name: short_name, valid: false};
    reg.menuItems.forEach(function(i) {
      if (i.short_name === short_name) {
        item.valid = true;
        item.name = i.name;
        item.description = i.description;
      }
    });
    return item;
  }

/*
  reg.submit = function () {
    reg.completed = true;
    UserService.saveUser(reg.user);
    $timeout(function(){
      $state.go('public.myinfo');
    },1000);
  };

  reg.checkFav = function () {
    reg.user.favorite = reg.user.favorite || '';
    var fav = (reg.user.favorite).toString().toUpperCase();
    var res = fav.split(/[ ,]+/);
    var items = [];
    reg.favInvalid = false;
    res.forEach(function(e) {
    if (e.length > 1 ) 
      { 
      var item = checkValidItem(e);
      if ( !item.valid ) reg.favInvalid = true;
      items.push(item);
      }
      });
      reg.user.favItems = items;
    };
*/

  reg.submit = function () {
    reg.user.favorite = reg.user.favorite || '';
    reg.favInvalid = false;
    var fav = (reg.user.favorite).toString().toUpperCase();
    var res = fav.split(/[ ,]+/); //separate by ' ' or ','
    console.log(res);
    var promisList = [];
    res.forEach(function(item) {
      var p = $q.defer();
      if( item ) {
        p = MenuService.getMenuItem(item);
        promisList.push(p);
      }
    });

    $q.all(promisList).
    then(function (response) {
      console.log(response);
      reg.completed = true;
      reg.user.favItems = response;
      UserService.saveUser(reg.user);
      $timeout(function(){
        $state.go('public.myinfo');
      },1000);      
    })
    .catch(function (errorResponse) {
      console.log(errorResponse);
      reg.favInvalid = true;
    });
  };

}

})();