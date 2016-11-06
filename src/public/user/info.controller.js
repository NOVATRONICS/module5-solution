(function () {

angular.module('public')
.controller('UserInfoController', UserInfoController);

UserInfoController.$inject = ['UserService'];
function UserInfoController(UserService) {
  var info = this;
  info.user = UserService.getUser();
}

})();