/**
 * Created by ThangLD5 on 12/27/2014.
 */

app.controller('KPIController', ['$scope', '$modal', 'ReportFactory', function ($scope, $modal, ReportFactory) {
    $scope.$watch(function () {
        return {
            UsedThemes: $scope.UsedThemes,
            UsedPerspectives: $scope.UsedPerspectives,
            UsedColors: $scope.UsedColors,
            UsedObjectives: $scope.UsedObjectives
        }
    }, function (value) {

        ///
        // Region KPI fileter
        ///
        $scope.KPIs = ReportFactory.GetKPIs();
        var KPIsAfterFilter = [];
        for (var iKPI in $scope.KPIs) {
            var KPI = $scope.KPIs[iKPI];

            var SelectedTheme = true;
            for (var iTheme in $scope.UsedThemes) {
                var Theme = $scope.UsedThemes[iTheme];
                if (Theme) {
                    SelectedTheme = false;
                    if (iTheme == KPI.Objective.StrategicTheme1 || iTheme == KPI.Objective.StrategicTheme2) {
                        SelectedTheme = true;
                        break;
                    }
                }
            }

            var SelectedPerspective = true;
            for (var iPerspective in $scope.UsedPerspectives) {
                var Perspective = $scope.UsedPerspectives[iPerspective];
                if (Perspective) {
                    SelectedPerspective = false;
                    if (iPerspective == KPI.Objective.ObjectivePerspective) {
                        SelectedPerspective = true;
                        break;
                    }
                }
            }

            var SelectedColor = true;
            for (var iColor in $scope.UsedColors) {
                var Color = $scope.UsedColors[iColor];
                if (Color) {
                    SelectedColor = false;
                    if (Color == KPI.KPISummaryColorInPeriod) {
                        SelectedColor = true;
                        break;
                    }
                }
            }

            var SelectedObjective = true;
            for (var iObjective in $scope.UsedObjectives) {
                var Objective = $scope.UsedObjectives[iObjective];
                if (Objective) {
                    SelectedObjective = false;
                    if (iObjective == KPI.Objective) {
                        SelectedObjective = true;
                        break;
                    }
                }
            }

            if (SelectedTheme && SelectedPerspective && SelectedColor && SelectedObjective)
                KPIsAfterFilter.push(KPI);
        }

        if (KPIsAfterFilter.length > 0)
            $scope.KPIs = KPIsAfterFilter;
        else
            $scope.KPIs = ReportFactory.GetKPIs();

    }, true);

    //modal cho phan hien thi chart
    $scope.openKPIChart = function (value) {
        var modalInstance = $modal.open({
            templateUrl: 'ModalKPIChart.html',
            controller: 'ModalInstanceCtrl',
            size: 'xs',
            resolve: {
                items: function () {
                    return value;
                }
            }
        });
    };

    //modal cho phan xem chi tiet chi so
    $scope.openKPIIssue = function (value) {
        var modalInstance = $modal.open({
            templateUrl: 'ModalKPIIssue.html',
            controller: 'ModalInstanceCtrl',
            size: '',
            resolve: {
                items: function () {
                    return value;
                }
            }
        });
    };

    $scope.setPage = function (n) {
        $scope.currentPage = n;
    };
}]);