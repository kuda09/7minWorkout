(function () {

    "use strict";

    var WorkoutListController = function ($scope, WorkoutService, $location){

        $scope.goto = function (workout) {

            $location.path("/builder/workouts/" + workout.name);

        }

        var init = function () {

            $scope.workouts = WorkoutService.getWorkouts();
        }

        init();
    }

    var WorkoutDetailController = function ($scope, WorkoutBuilderService, selectedWorkout) {

        var restWatch = $scope.$watch('formWorkout.restBetweenExericise', function (newValue) {

            if (newValue) {


                newValue.$parsers.unshift(function (value) {

                    return isNaN(parseInt(value)) ? value : parseInt(value);

                });

                newValue.$formatters.push(function (value) {

                    return isNaN(parseInt(value)) ? value : parseInt(value);

                });

                restWatch(); //De-register the watch after first time;
            }
        });

        var init = function () {

            $scope.workout = selectedWorkout; //resolved workout

        }

        init();
    }


    WorkoutListController['$inject'] = ['$scope', 'WorkoutService', '$location'];
    WorkoutDetailController['$inject'] = ['$scope', 'WorkoutBuilderService', 'selectedWorkout'];

    angular.module("WorkoutBuilder")
        .controller("WorkoutListController", WorkoutListController)
        .controller("WorkoutDetailController", WorkoutDetailController);



})();