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


    WorkoutListController['$inject'] = ['$scope', 'WorkoutService', '$location'];

    angular.module("WorkoutBuilder")
        .controller("WorkoutListController", WorkoutListController);



})();