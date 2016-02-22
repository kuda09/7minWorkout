(function () {

    "use strict";

    var ExerciseListController = function ($scope, WorkoutService, $location ){

        $scope.goto = function (exercise) {

            $location.path("/builder/exercises/" + exercise.name);

        }

        var init = function () {

            $scope.exercises = WorkoutService.getExercises();
        }

        init();
    };

    var ExercisesNavController = function ($scope, WorkoutService, WorkoutBuilderService) {


        $scope.addExercise = function (exercise) {

            WorkoutBuilderService.addExercise(exercise);
        }

        var init = function () {

            $scope.exercises = WorkoutService.getExercises();

        }

        init();
    };

    ExerciseListController['$inject'] = ['$scope', 'WorkoutService', '$location'];
    ExercisesNavController['$inject'] = ['$scope', 'WorkoutService', 'WorkoutBuilderService'];

    angular.module("WorkoutBuilder")
        .controller("ExerciseListController", ExerciseListController)
        .controller("ExercisesNavController", ExercisesNavController);

})();