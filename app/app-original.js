(function () {
    'use strict';

    //must match ng-app on html side
    angular.module("todo", [])
        .controller("ToDoController", function($scope){

            $scope.todos = [
                //official json specification is double-quotes
                {"title": "Pet a puppy", "completed": false},
                {"title": "Eat an apple", "completed": false},
                {"title": "Fly a kite", "completed": false},
                {"title": "Drink coffee", "completed": false},
                {"title": "Go to the gym", "completed": false}
            ];

            $scope.clearFinished = function() {
                //"Filter" deletes an array and creates a new array. Put array name in beginning ($scope.todos). True adds to the array and False deletes from array
                $scope.todos = $scope.todos.filter(function (item) {
                    return !item.completed;
                });
            };

            $scope.delete = function(item){
                $scope.todos.splice($scope.todos.indexOf(item),1);

            };

            $scope.add = function(){
                $scope.todos.push({title: $scope.newTodo, completed: false});
                $scope.newTodo = "";
            };


        })

        .filter('reverse', function() {
            return function(items) {
                return items.slice().reverse();
            };
        })

}());

