(function () {

    var guessTheNumberController = function ($scope) {

        $scope.verifyGuess = function () {

            $scope.deviation  = $scope.original - $scope.guess;
            $scope.noOfTries = $scope.noOfTries + 1;
        }

        $scope.initialiseGame = function () {

            $scope.noOfTries = 0;
            $scope.original = Math.floor((Math.random() * 1000) + 1);
            $scope.guess = null;
            $scope.deviation = null;

        }

        $scope.initialiseGame();

    }

    angular.module("guessTheNumberGame", [])
        .controller('GuessTheNumberController', guessTheNumberController);
})();