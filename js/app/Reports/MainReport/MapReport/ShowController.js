'use strict';

/* Controllers */

//controller su dung angular-gridter
app.controller('MapControllerFinancial', ['$scope', '$timeout', 'ReportFactory', function ($scope, $timeout, ReportFactory) {
    $scope.gridsterOptions = {
        margins: [10, 10],
        columns: 36,
        resizable: {
            enabled: true
        },
        draggable: {
            enabled: false,
            handle: 'box'
        }
    };
    $scope.dashboard = {
        widgets: []
    }
    $scope.dashboard.widgets = ReportFactory.GetObjectiveCoordinates().Financial;

}]);

