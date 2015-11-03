(function () {

    var WorkoutAudioContoller = function ($scope, $timeout) {

        $scope.exercisesAudio = [];

        var workoutPlanwatch = $scope.$watch('workoutPlan', function (newValue, oldValue) {

            if(newValue){ // newValue === workoutPlan

                angular.forEach($scope.workoutPlan.exercises, function (exercise ) {

                    $scope.exercisesAudio.push({
                        src: exercise.details.nameSound,
                        type: "audio/wav"
                    });

                }) ;

                workoutPlanwatch();
            }
        });


        $scope.$watch('currentExercise', function (newValue, oldValue) {

            if(newValue && newValue !== oldValue){

                if($scope.currentExercise.details.name === 'rest'){


                    $timeout(function () {

                        $scope.nextUpAudio.play();
                    }, 2000);


                    $timeout(function () {

                        $scope.nextUpExerciseAudio.play($scope.currentExerciseIndex + 1, true);
                    }, 2000);
                }
            }
        });

        $scope.$watch('currentExerciseDuration', function (newValue, oldValue) {


            var currentExerciseDuration = $scope.currentExercise.duration
            var halfExerciseDuration = Math.floor(currentExerciseDuration /2);
            var currentExerciseName = $scope.currentExercise.details.name;

            if(newValue){


                //the currect exercise duration gets to half way and the currentexercise name is not equal rest
                // then play the halfwayaudio sound
                // or of the current exercise duration reaches 70% play the about to complete sound
                if(newValue == halfExerciseDuration && currentExerciseName !== 'rest' ){

                    $scope.halfWayAudio.play();
                } else if (newValue == currentExerciseDuration - 3 ) {

                    $scope.aboutToCompleteAudio.play();
                }
            }

        });


        $scope.$watch('workoutPaused', function (newValue, oldValue) {

            if(newValue){

                $scope.ticksAudio.pause();
                $scope.nextUpAudio.pause();
                $scope.nextUpExerciseAudio.pause();
                $scope.halfWayAudio.pause();
                $scope.aboutToCompleteAudio.pause();
            } else {

                $scope.ticksAudio.play();

                if($scope.halfWayAudio.currentTime > 0 && $scope.halfWayAudio.currentTime < $scope.halfWayAudio.duration){

                    $scope.halfWayAudio.play();

                }

                if($scope.aboutToCompleteAudio.currentTime > 0 && $scope.aboutToCompleteAudio.currentTime < $scope.aboutToCompleteAudio.duration){

                    $scope.aboutToCompleteAudio.play();

                }
            }

        })

        var init = function () {

            workoutPlanwatch();

        };


        init();
    }


    WorkoutAudioContoller['$inject'] = ['$scope', '$timeout'];
    angular.module('7minWorkout')
        .controller('WorkoutAudioContoller', WorkoutAudioContoller)

})();