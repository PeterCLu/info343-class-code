
angular.module('Movies', ['ui.router'])
    .factory('moviesJSON', function($http) {
        return $http.get('data/movies-2014.min.jason');
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', {
                url: '/movies',
                templateUrl: 'views/movies-list.html',
                controller: 'MoviesController'
            })
            .state('detail', {
                url: '/movies:index',
                templateUrl: 'views/movies-detail.html',
                controller: 'MovieDetailController'
            });
        $urlRouterProvider.otherwise('/movie');
    })

    .controller('MovieDetailController', function($scope, $stateParams, moviesJSON) {
        moviesJSON.then(function(results) {
            $scope.movie = results.data[$stateParams.index]
        })
    })
    .controller('MoviesController', function($scope, moviesJSON) {
        var ratingsMap  = {
            'Not Rated': 0,
            'G': 1,
            'PG': 2,
            'PG-13': 3,
            'R': 4,
            'NC-17': 5,
            'X': 6
        };
        //get our movies JSON file
            moviesJSON.then(function(results) {
                //results is an object iwth info about the entire HTTP response
                //the data itself can be acessed via its 'data' property
                $scope.movies = results.data.map(function(movie) {
                    movie.ratingOrdinal = ratingsMap[movie.rating];
                    return movie;
                });

                //Pluck the distributor property from each object into an array
                //and then get the unique items in that array
                $scope.distributors = _.uniq(_.pluck($scope.movies, 'distributor'));
            });
        $scope.setSort = function(propertyName) {
            if ($scope.sortCol === propertyName) {
                $scope.sortReverse = !$scope.sortReverse;
            }
            else {
                $scope.sortCol = propertyName;
                $scope.sortReverse = false;
            }

        }
    });