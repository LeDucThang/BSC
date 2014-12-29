/**
 * Created by ThangLD5 on 12/27/2014.
 */

app.controller('ProjectController', ['$scope', 'ReportFactory', function ($scope, ReportFactory) {
    $scope.$watch(function () {
        return {
            UsedThemes: $scope.UsedThemes,
            UsedPerspectives: $scope.UsedPerspectives,
            UsedColors: $scope.UsedColors,
            UsedObjectives: $scope.UsedObjectives
        }
    }, function (value) {

        ///
        // region Project filter
        ///
        $scope.Projects = ReportFactory.GetProjects();
        var ProjectAfterFilter = [];
        for (var iProject in $scope.Projects) {
            var Project = $scope.Projects[iProject];

            var SelectedTheme = true;
            for (var iTheme in $scope.UsedThemes) {
                var Theme = $scope.UsedThemes[iTheme];
                if (Theme) {
                    SelectedTheme = false;
                    if (iTheme == Project.Objective.StrategicTheme1 || iTheme == Project.Objective.StrategicTheme2) {
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
                    if (iPerspective == Project.Objective.ObjectivePerspective) {
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
                    if (iColor == Project.ProjectColorInPeriod) {
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
                    if (iObjective == Project.Objective) {
                        SelectedObjective = true;
                        break;
                    }
                }
            }
            if (SelectedTheme && SelectedPerspective && SelectedColor && SelectedObjective)
                ProjectAfterFilter.push(Project);
        }

        if (ProjectAfterFilter.length > 0)
            $scope.Projects = ProjectAfterFilter;
        else
            $scope.Projects = ReportFactory.GetProjects();

    }, true);

    //modal cho phan xem chi tiet du an
    $scope.openProjectIssue = function (value) {
        var modalInstance = $modal.open({
            templateUrl: 'ModalProjectIssue.html',
            controller: 'ModalInstanceCtrl',
            size: value,
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