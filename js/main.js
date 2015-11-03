(function (){
    "use strict";

    angular.module("app", ["ngRoute", "ngSanitize", "7minWorkout", "WorkoutBuilder", "mediaPlayer", "ui.bootstrap", "ngAnimate", "LocalStorageModule"])
        .config(function ($routeProvider) {

            $routeProvider.when('/start', {

                templateUrl: 'partials/start.html'
            });
            $routeProvider.when('/workout', {

                templateUrl: 'partials/workout.html',
                controller: "WorkoutController"
            });
            $routeProvider.when('/finish', {

                templateUrl: "partials/finish.html"
            });

            $routeProvider.when('/builder', {
                redirectTo: '/builder/workouts'
            });

            $routeProvider.when('/builder/workouts', {
                templateUrl: 'partials/workoutbuilder/workouts.html',
                leftNav: 'partials/workoutbuilder/left-nav-main.html',
                topNav: 'partials/workoutbuilder/top-nav.html',
                controller: 'WorkoutListController'
            });
            $routeProvider.when('/builder/exercises', {
                templateUrl: 'partials/workoutbuilder/exercises.html',
                leftNav: 'partials/workoutbuilder/left-nav-main.html',
                topNav: 'partials/workoutbuilder/top-nav.html',
                controller: 'ExerciseListController'
            });
            $routeProvider.when('/builder/workouts/new', {
                templateUrl: 'partials/workoutbuilder/workout.html',
                leftNav: 'partials/workoutbuilder/left-nav-exercises.html',
                topNav: 'partials/workoutbuilder/top-nav.html',
                controller: "WorkoutDetailController",
                resolve: {
                selectedWorkout: ['WorkoutBuilderService', function (WorkoutBuilderService) {

                    return WorkoutBuilderService.toString();
                }]
            }
            });
            $routeProvider.when('/builder/workouts/:id', {
                templateUrl: 'partials/workoutbuilder/workout.html',
                leftNav: 'partials/workoutbuilder/left-nav-exercises.html',
                topNav: 'partials/workoutbuilder/top-nav.html',
                controller: "WorkoutDetailController",
                resolve: {
                    selectedWorkout: ['WorkoutBuilderService', '$route', function (WorkoutBuilderService, $route) {

                        return WorkoutBuilderService.startBuilding($route.current.params.id);
                    }]
                }
            });
            $routeProvider.when('/builder/exercises/new', { templateUrl: 'partials/workoutbuilder/exercise.html' });
            $routeProvider.when('/builder/exercises/:id', { templateUrl: 'partials/workoutbuilder/exercise.html' });

            $routeProvider.otherwise({
                redirectTo: '/start'
            });

        });

    angular.module('7minWorkout', []);
    angular.module('WorkoutBuilder', []);

})();