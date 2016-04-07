'use strict';

module.exports = modalController;

modalController.$inject = ['$uibModal', '$state', 'modalParams'];
function modalController($uibModal, $state, modalParams) {
    var modalInstance = $uibModal.open(modalParams);

    modalInstance.result.then(function(selectedItem) {
    }, function(msg) {
        console.info(msg);
    }).then(function() {
        $state.go('^');
    });
}