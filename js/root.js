"use strict";

var RootController = function ($scope, $uibModal) {

    $scope.showWorkoutHistory = function () {

        var dialog = $uibModal.open({
            templateUrl: "partials/workout-history.html",
            controller: WorkoutHistoryController,
            size: "lg"
        })

    }

    $scope.$on("$routeChangeSuccess", function (e, current, previous) {

        $scope.currentRoute = current;

    })
};

var WorkoutHistoryController = function ($scope, $modalInstance, workoutHistoryTracker) {

    $scope.search = {};
    $scope.search.completed = "";
    $scope.history = workoutHistoryTracker.getHistory();

    $scope.ok = function () {

        $modalInstance.close();

    }
};


RootController['$inject'] = ['$scope', '$uibModal'];
WorkoutHistoryController['$inject'] = ['$scope', '$modalInstance', 'workoutHistoryTracker'];
angular.module("app")
    .controller("RootController", RootController)
    .controller("WorkoutHistoryController" , WorkoutHistoryController);

