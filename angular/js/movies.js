
angular.module('Movies', [])
    .controller('MoviesController', function($scope, $http) {
        $http.get('data/movies-2014.min.json')
            .then(function(result) {
                $scope.movies = result.data;
            });
    });