(function () {
    "use strict";

    var self;

    var ExerciseService = function () {

        function Exercise(args) {

            self = this;

            self.name = args.name;
            self.title = args.title;
            self.description = args.description;
            self.image = args.image;
            self.related = {};
            self.related.videos = args.videos || [];
            self.nameSound = args.nameSound;
            self.procedure = args.procedure;
        }


        return Exercise;
    };

    var WorkoutPlanExercise = function () {

        function WorkoutPlan(args) {

            self = this;

            self.exercises = [];
            self.name = args.name;
            self.title = args.title;
            self.description = args.description;
            self.restBetweenExercise = self.restBetweenExercise;
        }

        WorkoutPlan.prototype.totalWorkoutDuration = function () {

            var total = 0;

            if(self.exercises.length == 0) {
                return 0;
            }

            angular.forEach(self.exercises, function (exercise) {

                total = total + (exercise.duration ? exercise.duration : 0);

            })

            return total;
        }

        return WorkoutPlan;

    }
    angular.module("app")
        .factory("Exercise", ExerciseService)
        .factory("WorkoutPlan", WorkoutPlanExercise)


})();