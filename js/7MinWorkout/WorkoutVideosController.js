(function () {

    var WorkoutVideosContoller = function ($scope, $uibModal) {

        $scope.playVideo = function (videoId) {

            $scope.pauseWorkout();

            $scope.animationsEnabled = true;

            var dialog = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'youtube-modal',
                controller: VideoPlayerController,
                scope: $scope.$new(true),
                resolve: {
                    video: function () {

                        return "//www.youtube.com/embed/" + videoId;
                    }
                },
                size: 'lg'
            }).result['finally'](function () {

                $scope.resumeWorkout();
            })


        }
    }

    var VideoPlayerController = function ($scope, $modalInstance, video) {

        $scope.video = video;
        $scope.ok = function () {

            $modalInstance.close();
        }

    };


    WorkoutVideosContoller['$inject'] = ['$scope', '$uibModal'];
    VideoPlayerController['$inject'] = ['$scope', '$modalInstance', 'video'];
    angular.module('7minWorkout')
        .controller('WorkoutVideosContoller', WorkoutVideosContoller)
        .controller('VideoPlayerController', VideoPlayerController);

})();