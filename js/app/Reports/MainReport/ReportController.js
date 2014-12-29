/**
 * Created by tatda_000 on 11/12/2014.
 */

app.controller('ReportController', ['$scope', '$modal', '$log', 'ReportFactory', function ($scope, $modal, $log, ReportFactory) {

    //set title page
    //$scope.page.setTitle('Báo cáo tùy chọn');
    //$scope.$storage.userToken
    $scope.Submit = function (FilterMain) {
        ReportFactory.Submit(FilterMain, $scope.$storage.userToken);
        $scope.KPIs = ReportFactory.GetKPIs();
    };
    $scope.Companies = ReportFactory.GetAllCompanies();
    $scope.itemsPerPage = 10;
    $scope.currentPage = 0;

    $scope.KPIs = ReportFactory.GetKPIs();
    $scope.Projects = ReportFactory.GetProjects();
    $scope.Objectives = ReportFactory.GetObjectives();
    $scope.Issues = ReportFactory.GetIssues();
    $scope.Years = ReportFactory.GetYears();
    $scope.Periods = ReportFactory.GetPeriods();

    $scope.UsedThemes = {}; //lay ra ten cac chu de
    $scope.UsedPerspectives = {}; //lay ra ten cac tang
    $scope.UsedColosr = {}; //lay ra cac trang thai cua chi so
    $scope.UsedObjectives = {}; //lay ra danh sach cac muc tieu

    $scope.FilterTheme = ReportFactory.GetFilterTheme();
    $scope.FilterPerspective = ReportFactory.GetFilterPerspective();
    $scope.FilterColour = ReportFactory.GetFilterColor();
    $scope.FilterObjective = ReportFactory.GetFilterObjective();

    //
    //modal cho phan xem chi tiet filter
    $scope.openFilter = function (value) {
        var modalInstance = $modal.open({
            templateUrl: 'modalFilter.html',
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

    //tab hien thi chi so, ban do, van de ...
    $scope.tabs = [true, false, false, false];
    $scope.tab = function (index) {
        angular.forEach($scope.tabs, function (i, v) {
            $scope.tabs[v] = false;
        });
        $scope.tabs[index] = true;
    };

    //tab trong filter
    $scope.tabsFilter = [true, false, false];
    $scope.tabFilter = function (index) {
        angular.forEach($scope.tabsFilter, function (i, v) {
            $scope.tabsFilter[v] = false;
        });
        $scope.tabsFilter[index] = true;
    };

    //slider chinh co chu~
    $scope.val = 15;
    var updateModel = function (val) {
        $scope.$apply(function () {
            $scope.val = val;
        });
    };
    angular.element("#slider").on('slideStop', function (data) {
        updateModel(data.value);
    });
    //change font-size ( button )
    $(document).ready(function () {
        $('#incfont').click(function () {
            curSize = parseInt($('tbody').css('font-size')) + 3;
            if (curSize <= 20)
                $('tbody').css('font-size', curSize);
        });
        $('#decfont').click(function () {
            curSize = parseInt($('tbody').css('font-size')) - 3;
            if (curSize >= 11)
                $('tbody').css('font-size', curSize);
        });
    });
    //function set font size
    $scope.fontSize = function (size) {
        var body = document.getElementsByTagName('body')[0];
        $scope.size2 = '"' + size + 'px"';
        body.style.fontSize = $scope.size2;
    }

}]);


app.controller('CollapseCtrl', function ($scope) {
    $scope.isCollapsed = true;
});

app.controller('DropdownCtrl', function ($scope, $log) {
    $scope.items = [
        'The first choice!',
        'And another choice for you.',
        'but wait! A third!'
    ];
    $scope.status = {
        isopen: false
    };

    $scope.toggled = function (open) {
        $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
});

app.controller('AccordionCtrl', function ($scope) {
    $scope.oneAtATime = false;

    $scope.groups = [
        {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        },
        {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function () {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };
});


