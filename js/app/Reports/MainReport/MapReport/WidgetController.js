//controller cho widget

app.controller('WidgetCtrl', ['$scope', '$modal',
    function ($scope, $modal) {

        $scope.remove = function (widget) {
            $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
        };

        $scope.openSettings = function (widget) {
            $modal.open({
                scope: $scope,
                templateUrl: linkWidgetMap, //get link from file 'js/links.js'
                controller: 'WidgetSettingsCtrl',
                resolve: {
                    widget: function () {
                        return widget;
                    }
                }
            });
        };

    }
]);


//controller cho setting widget
app.controller('WidgetSettingsCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance', 'widget',
    function ($scope, $timeout, $rootScope, $modalInstance, widget) {
        $scope.widget = widget;

        $scope.themes = [{theme: 'transforming'}, {theme: 'innovating'}, {theme: 'operational'}, {theme: 'strategic'}];

        var uniqueItems = function (data, key) {
            var result = new Array();
            for (var i = 0; i < data.length; i++) {
                var value = data[i][key];

                if (result.indexOf(value) == -1) {
                    result.push(value);
                }

            }
            return result;
        };
        $scope.listTheme = uniqueItems($scope.themes, 'theme');
        $scope.form = {
            colorTheme: widget.colorTheme,
            content: widget.content,
            sizeX: widget.sizeX,
            sizeY: widget.sizeY,
            col: widget.col,
            row: widget.row
        };

        $scope.sizeOptions = [{
            id: '1',
            name: '1'
        }, {
            id: '2',
            name: '2'
        }, {
            id: '3',
            name: '3'
        }, {
            id: '4',
            name: '4'
        }];

        $scope.dismiss = function () {
            $modalInstance.dismiss();
        };

        $scope.remove = function () {
            $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
            $modalInstance.close();
        };

        $scope.submit = function () {
            angular.extend(widget, $scope.form);

            $modalInstance.close(widget);
        };

    }
]);