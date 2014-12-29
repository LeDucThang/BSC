//Service for report Option 
app.factory('ReportFactory', function ($http) {
    var Companies = [];
    var KPIs = [];
    var Projects = [];
    var Objectives = [];
    var Issues = [];
    var Years = [];
    var Periods = [];
    var ObjectiveCoordinates = {
        Financial: [],
        Customer: [],
        InternalProcess: [],
        LearningAndGrowth: []
    };
    // Get all companies in BSC
    var LinkCompanies = 'http://api.bsc.ho.fpt.vn/api/Administrator/AdminCompanyController/GetAllCompanies';
    $http.get(LinkCompanies).then(function (msg) {
        var response = msg.data.Data;
        for (var i = 0; i < response.length; i++) {
            Companies.push(response[i]);
        }
    });
    // Get All Year in BSC
    for (var i = 2016; i >= 2011; i--) {
        Years.push(i);
    }

    // Get All Period in BSC

    Periods = [
        {'Value': 0, 'Text': 'Tháng 1'},
        {'Value': 1, 'Text': 'Tháng 2'},
        {'Value': 2, 'Text': 'Tháng 3'},
        {'Value': 3, 'Text': 'Tháng 4'},
        {'Value': 4, 'Text': 'Tháng 5'},
        {'Value': 5, 'Text': 'Tháng 6'},
        {'Value': 6, 'Text': 'Tháng 7'},
        {'Value': 7, 'Text': 'Tháng 8'},
        {'Value': 8, 'Text': 'Tháng 9'},
        {'Value': 9, 'Text': 'Tháng 10'},
        {'Value': 10, 'Text': 'Tháng 11'},
        {'Value': 11, 'Text': 'Tháng 12'},
        {'Value': 12, 'Text': 'Quý 1'},
        {'Value': 13, 'Text': 'Quý 2'},
        {'Value': 14, 'Text': 'Quý 3'},
        {'Value': 15, 'Text': 'Quý 4'},
    ];

    var LinkK = 'http://api.bsc.ho.fpt.vn/api/ReporterKPI/GetAllKPIByYears?usertoken=5b2f1018-e4e7-4ef9-a429-514ca39f4fd1&CompanyId=1f4d9d9c-f79f-4537-9944-d524b04628b2&Year=2015&Period=11';
    $http.get(LinkK).then(function (msg) {
        var response = msg.data.Data;
        for (var i = 0; i < response.length; i++) {
            KPIs.push(response[i]);
        }
    });
    var LinkP = 'http://api.bsc.ho.fpt.vn/api/ReporterProject/GetAllProjects?usertoken=5b2f1018-e4e7-4ef9-a429-514ca39f4fd1&CompanyId=1f4d9d9c-f79f-4537-9944-d524b04628b2&Year=2015&Period=11';
    $http.get(LinkP).then(function (msg) {
        var response = msg.data.Data;
        for (var i = 0; i < response.length; i++) {
            Projects.push(response[i]);
        }
    });

    var LinkO = 'http://api.bsc.ho.fpt.vn/api/ReporterObjectives/GetAllObjectives?usertoken=5b2f1018-e4e7-4ef9-a429-514ca39f4fd1&CompanyId=1f4d9d9c-f79f-4537-9944-d524b04628b2&Year=2015&Period=11';
    $http.get(LinkO).then(function (msg) {
        var response = msg.data.Data;
        InitObjectiveCoordinates(response)
    });

    function InitObjectiveCoordinates(response) {
        ObjectiveCoordinates.Financial.length = 0;
        ObjectiveCoordinates.Customer.length = 0;
        ObjectiveCoordinates.InternalProcess.length = 0;
        ObjectiveCoordinates.LearningAndGrowth.length = 0;
        var Obj;
        for (var i = 0; i < response.length; i++) {
            Obj = {
                col: response[i].ObjectiveCoordinate.Column,
                row: response[i].ObjectiveCoordinate.Row,
                sizeX: response[i].ObjectiveCoordinate.Width,
                sizeY: response[i].ObjectiveCoordinate.Height,
                code: response[i].Objective.ObjectiveCode,
                name: response[i].Objective.ObjectiveName,
                mainColor: response[i].ObjectiveColor[0],
                previous1: response[i].ObjectiveColor[1],
                previous2: response[i].ObjectiveColor[2],
                previous3: response[i].ObjectiveColor[3],
            };
            if (response[i].Objective.ObjectivePerspective == 'Financial') {
                ObjectiveCoordinates.Financial.push(Obj);
            }
            else if (response[i].Objective.ObjectivePerspective == 'Customer') {
                ObjectiveCoordinates.Customer.push(Obj);
            }
            else if (response[i].Objective.ObjectivePerspective == 'Internal Process') {
                ObjectiveCoordinates.InternalProcess.push(Obj);
            }
            else if (response[i].Objective.ObjectivePerspective == 'Learning & Growth') {
                ObjectiveCoordinates.LearningAndGrowth.push(Obj);
            }
        }
    }

    function Submit(FilterMain, usertoken) {
        var LinkKPIs = 'http://api.bsc.ho.fpt.vn/api/ReporterKPI/GetAllKPIByYears?usertoken=' + usertoken +
            '&CompanyId=' + FilterMain.CompanyId + '&Year=' + FilterMain.Year + '&Period=' + FilterMain.Period;
        var LinkProjects = 'http://api.bsc.ho.fpt.vn/api/ReporterProject/GetAllProjects?usertoken=' + usertoken +
            '&CompanyId=' + FilterMain.CompanyId + '&Year=' + FilterMain.Year + '&Period=' + FilterMain.Period;
        var LinkObjectives = 'http://api.bsc.ho.fpt.vn/api/ReporterObjectives/GetAllObjectives?usertoken=' + usertoken +
            '&CompanyId=' + FilterMain.CompanyId + '&Year=' + FilterMain.Year + '&Period=' + FilterMain.Period;
        var LinkIssues = ' ';


        Issues.length = 0;

        console.log(LinkKPIs);
        console.log(LinkProjects);

        $http.get(LinkKPIs).then(function (msg) {
            KPIs.length = 0;
            var response = msg.data.Data;
            for (var i = 0; i < response.length; i++) {
                KPIs.push(response[i]);
            }
        });

        $http.get(LinkProjects).then(function (msg) {
            Projects.length = 0;
            var response = msg.data.Data;
            for (var i = 0; i < response.length; i++) {
                Projects.push(response[i]);
            }
        });

        //$http.get(LinkObjectives).then(function (msg) {
        //Objectives.length = 0;
        //    var response = msg.data.Data;
        //    for (var i = 0; i < response.length; i++) {
        //        Objectives.push(response[i]);
        //    }
        //});

        //$http.get(LinkIssues).then(function (msg) {
        //    var response = msg.data.Data;
        //    for (var i = 0; i < response.length; i++) {
        //        Issues.push(response[i]);
        //    }
        //});
    }

    function GetProjects() {
        return Projects;
    }

    function GetKPIs() {
        return KPIs;
    }

    function GetObjectives() {
        return Objectives;
    }

    function GetIssues() {
        return Issues;
    }

    function GetAllCompanies(scope) {
        return Companies;
    }

    function GetYears() {
        return Years;
    }

    function GetPeriods() {
        return Periods;
    }

    function GetObjectiveCoordinates() {
        return ObjectiveCoordinates;
    }

    function GetKPIById(KPIId) {
        console.log('Export ID');
        console.log(KPIId);
        for (var i = 0; i < KPIs.length; i++) {
            console.log(KPIId);
            if (KPIs[i].KPIByYear.KPIByYearId == KPIId) return KPIs[i];
        }
    }

    function GetFilterTheme() {
        var FilterTheme = [
            {
                Theme: 'Transforming FPT',
                Display: 'Transforming FPT'
            },
            {
                Theme: 'Innovating',
                Display: 'Innovating'
            },
            {
                Theme: 'Operational Excellence',
                Display: 'Operational Excellence'
            },
            {
                Theme: 'Strategic Enablers',
                Display: 'Strategic Enablers'
            }];
        return FilterTheme;
    }

    function GetFilterPerspective() {
        var FilterPerspective = [
            {
                Perspective: 'Financial',
                Display: 'Financial'
            },
            {
                Perspective: 'Customer',
                Display: 'Customer'
            },
            {
                Perspective: 'InternalProcess',
                Display: 'Internal Process'
            },
            {
                Perspective: 'LearningAndGrowth',
                Display: 'Learning & Growth'
            }];
        return FilterPerspective;
    }

    function GetFilterColor() {
        var FilterColor = [
            {
                ColorName: 'green',
                Display: 'green'
            },
            {
                ColorName: 'yellow',
                Display: 'yellow'
            },
            {
                ColorName: 'red',
                Display: 'red'
            },
            {
                ColorName: 'violet',
                Display: 'violet'
            },
            {
                ColorName: 'gray',
                Display: 'gray'
            }];
        return FilterColor;
    }

    function GetFilterObjective() {
        var FilterObjective = {};
        return FilterObjective;
    }

    return {
        GetAllCompanies: GetAllCompanies,
        GetYears: GetYears,
        GetPeriods: GetPeriods,
        Submit: Submit,

        GetProjects: GetProjects,
        GetKPIs: GetKPIs,
        GetKPIById: GetKPIById,
        GetObjectives: GetObjectives,
        GetObjectiveCoordinates: GetObjectiveCoordinates,
        GetIssues: GetIssues,

        GetFilterTheme: GetFilterTheme,
        GetFilterPerspective: GetFilterPerspective,
        GetFilterColor: GetFilterColor,
        GetFilterObjective: GetFilterObjective
    }
});