angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){




    $scope.comments = [];



    $scope.numClicks = 0;
    $scope.incrementClicks = function(){
      $scope.numClicks++;
    }





    $scope.create = function(comment) {
      return $http.post('/comments', comment).success(function(data){
        $scope.comments.push(data);
      });
    };


    $scope.addComment = function() {
      if($scope.formContent === '') { return; }
      console.log("In addComment with "+$scope.formContent);
      $scope.create({
        title: $scope.formContent,
        upvotes: $scope.numClicks,
      });
      $scope.formContent = '';
      $scope.numClicks = 0;
    };


    $scope.getAll = function() {
      return $http.get('/comments').success(function(data){
        angular.copy(data, $scope.comments);
      });
    };

    $scope.getAll();


  }
  ]);
