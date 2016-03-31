'use strict';

module.exports = navbarController;

navbarController.$inject = ['$location'];
function navbarController($location) {
    var vm = this;

    vm.isView = isView;
    vm.navCollapsed = true;
    vm.toggleNav = toggleNav;

    function isView(path, isPrefix) {
        isPrefix = isPrefix || false;
        if (!isPrefix) {
            return path === $location.path();
        } else {
            return $location.path().indexOf(path) === 0;
        }
    }

    function toggleNav() {
        if (window.innerWidth < 768) {
            vm.navCollapsed = !vm.navCollapsed;
        }
    }
}
