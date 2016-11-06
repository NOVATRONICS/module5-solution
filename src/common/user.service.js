(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);


UserService.$inject = [];
function UserService() {
  var service = this;
  var user = {};
  service.getUser = function () {
    return user;
  };
  service.saveUser = function (userInfo) {
    user = userInfo;
    console.log('saveUser',user);
  };
}

})();
