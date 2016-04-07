'use strict';

module.exports = modalController;

modalController.$inject = ['$scope', '$uibModal', '$state', 'modalParams'];
function modalController($scope, $uibModal, $state, modalParams) {
    var modalInstance = $uibModal.open(modalParams);
    var myState = $state.current;
    var listenerDestroyer = $scope.$on('$stateChangeStart', closeOnRouteUpdate);
    $scope.$on('$destroy', onScopeDestroy);

    modalInstance.result.then(function(selectedItem) {
    }, function(msg) {
        console.info(msg);
    }).then(function() {
        if ($state.current == myState) {
            $state.go('^');
        }
    });

    function closeOnRouteUpdate(event, toState) {
        modalInstance.dismiss('Unexpected route change');
    }
    
    function onScopeDestroy() {
        // Avoid memory leak
        listenerDestroyer();
    }
}