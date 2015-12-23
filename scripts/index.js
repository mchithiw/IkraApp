
var app = angular.module("myApp", ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
    .when('/', {
        templateUrl: 'home.html',
        controller: 'homeController',
    })
    .when('/sura', {
        templateUrl: 'sura.html',
        controller: 'suraController',
    })
	.otherwise({redirectTo: '/'});

}]);

app.controller("navController", function($scope, $location, $http) {

    $scope.keywordButton = function() {
        $location.path('/');
    }

    $scope.suraButton = function() {
        console.log("hey");
        $location.path('/sura');
    }
});

app.controller("homeController", function($scope, $location, $http) {

    $scope.result = "";

    $scope.results;
    $scope.count = 0;
    $scope.showCount = false;

    $scope.pages = [];

    $scope.currentPageResults;

    $scope.getResults = function() {

        if ($scope.keyword.length > 2)
        {
            $scope.result = $scope.keyword.toLowerCase();

            var data = $.param({
                keyword: $scope.result
            });

            console.log("About to post");
            console.log($scope.result);

            $http.post('php/keyword.php', {"keyword":$scope.result})
            .then( function(response) {

                $scope.results = response.data;
                $scope.currentPageResults = $scope.results;
                $scope.count = $scope.results.length;
                console.log($scope.count);
                $scope.showCount = true;

                pagenation();

                $scope.fetchResults(1);
            
            });
        } else
        {
            $scope.showCount = false;

            if ($scope.keyword === "")
                $scope.results = [];
        }
    };

    function pagenation()
    {
        var pages = Math.ceil($scope.results.length / 10);
        console.log(pages);

        var counter = 1;

        $scope.pages = [];

        while (counter <= pages)
        {
            $scope.pages.push(counter);
            counter++;
        }

        console.log($scope.pages);
    }

    $scope.fetchResults = function(index)
    {

        $scope.currentPageResults = [];

        var start = (index * 10) - 10;

        var end = start + 10;

        if (end > $scope.results.length)
            end = $scope.results.length;

        while (start < end)
        {
            $scope.currentPageResults.push($scope.results[start]);
            start++;
        }

        console.log($scope.currentPageResults);

    }

});

app.controller("suraController", function($scope, $location, $http) {

    $scope.result = "";

    $scope.results;
    $scope.count = 0;

    $scope.showEmptyMessage = false;
    $scope.emptyMessage = "Enter a Sura number from 1 - 114.";


    $scope.getResults = function() {

        if ($scope.sura.length > 0)
        {
            $scope.result = parseInt($scope.sura);

            if (isNaN($scope.result))
            {
                $scope.showEmptyMessage = true;
                $scope.sura = "";
                return;
            }

            if ($scope.result > 114)
            {
                $scope.showEmptyMessage = true;
                $scope.results = [];
                return;
            }

            if ($scope.result < 10)
                $scope.audioSrc = "mp3/00" + $scope.result + ".mp3";
            else if ($scope.result < 100)
                $scope.audioSrc = "mp3/0" + $scope.result + ".mp3";
            else 
                $scope.audioSrc = "mp3/" + $scope.result + ".mp3";


            console.log($scope.audioSrc);

            $scope.showEmptyMessage = false;

            $http.post('php/sura.php', {"sura":$scope.result})
            .then( function(response) {

                console.log(response);
                $scope.results = response.data;
                $scope.count = $scope.results.length;

                if (response.data.length === 0)
                {
                    $scope.showEmptyMessage = true;
                }

            });
        } else
        {
            $scope.showCount = false;

            if ($scope.sura === "")
                $scope.results = [];

            $scope.showEmptyMessage = true;
        }
    };

});