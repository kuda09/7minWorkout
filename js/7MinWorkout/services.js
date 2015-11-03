angular.module("7minWorkout")
.factory('workoutHistoryTracker', ["$rootScope", "localStorageService", function ($rootScope, localStorageService) {

        var maxHistoryItems = 20; //track the 20 exercises
        var currentWorkoutLog = null;
        var service = {};
        var storageKey = "workouthistory";
        var workoutHistory = localStorageService.get(storageKey) || [];

        service.startTracking = function () {

            localStorageService.add(storageKey, workoutHistory);

            currentWorkoutLog = {
                startedOn: new Date().toISOString(),
                completed: false,
                exercisesDone: 0
            };

            if(workoutHistory.length >= maxHistoryItems){

                workoutHistory.shift();
            }

            workoutHistory.push(currentWorkoutLog);
        }

        service.endTracking = function (completed) {

            currentWorkoutLog.completed = completed;
            currentWorkoutLog.endedOn = new  Date().toISOString();
            currentWorkoutLog = null;

        }

        service.getHistory = function () {

            return workoutHistory;
        }

        $rootScope.$on('event:workout:exerciseStarted', function (event, args) {

            currentWorkoutLog.lastExercise  = args.title;

            ++currentWorkoutLog.exercisesDone;

            localStorageService.add(storageKey, workoutHistory);
        })

        $rootScope.$on("$routeChangeSuccess", function (e, args) {

            if(currentWorkoutLog){

                service.endTracking(false);
            }

            localStorageService.add(storageKey, workoutHistory);

        })


        return service;

    }])