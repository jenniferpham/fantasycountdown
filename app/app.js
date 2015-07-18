(function () {
    'use strict';

    //must match ng-app on html side
    angular.module("todo", [])

        .controller("timeCtrl", function($scope) {
            $scope.hello="helloname";

            var nameArray = [{name:'John', orderNumber:0}, {name:'Leo', orderNumber:0},{name:'Allison', orderNumber:0},{name:'Teri', orderNumber:0},{name:'Jill', orderNumber:0}];
            $scope.nameArray = nameArray;

            $scope.delete = function(item){
                $scope.nameArray.splice($scope.nameArray.indexOf(item),1);

            };

            $scope.addName = function(){
                //GET A NUMBER: get tag of input name and then substring to just get the number, then parseInt the number

                $scope.nameArray.push({name: $scope.newName, orderNumber: ''});
                $scope.newName = "";
            };

            //    randomize names
            $scope.randomizer = function() {
                nameArray = $scope.nameArray;
                //assign random number to each item in the namesArray
                angular.forEach(nameArray, function (item, index) {
                    var randomNumber = Math.random() * nameArray.length;
                    item.orderNumber = randomNumber;
                });
                nameArray.sort(function (a, b) {
                        return a.orderNumber - b.orderNumber
                    }
                );
                return nameArray;
            }

            $scope.deleteAll = function(){
                $scope.nameArray = [{name:"", orderNumber:0}];

            }

     //TIMER FUNCTIONS
            var userTimeIntervalMS;
            $scope.selectTimeInterval = function(){
                var userTimeInterval = $scope.userTimeInterval;  //object with min and sec property
                var userMin = parseInt(userTimeInterval.min);
                var userSec = parseInt(userTimeInterval.sec);
                userTimeIntervalMS = ((userMin * 60) + userSec) * 1000; //must set ng-model and change to milliseconds
                $scope.userTimeInterval= "";
            };

            //$scope.startTime = function(){
            //
            //};

     //function to get leftover time
            $scope.timeLeft = function(){
                // set the date you are counting down to
                var timeNow = new Date().getTime();
                var targetTime = timeNow + userTimeIntervalMS;
                var secondsDifference = (targetTime - timeNow) / 1000;  //divide by 1000 because the difference is in milliseconds and we want seconds

                var minutesLeft = parseInt((secondsDifference / 60), 10);
                var secondsLeft = parseInt((secondsDifference % 60), 10);  //get remainder of seconds that don't evenly fit into minutes or 69 sec
alert("timeNow " + timeNow + ". targetTime " + targetTime + ". secondsDifference " + secondsDifference + ". minLeft " + minutesLeft + ". secLeft "+secondsLeft)
                //use these variables to display on client side
                $scope.countdownMin = minutesLeft;
                $scope.countdownSec = secondsLeft;

            };

            var numberLoop = 0;
            $scope.startTime = function(){
                setInterval(function () {
                    numberLoop += 1;
                    var highlightedList = [];

                    //PUSH ONE ITEM OF NAMEARRAY whose indexnumber matches numberLoop INTO THE highlightedList array;
                    angular.forEach(nameArray, function(item, index) {
                    //    if (index === (numberLoop + 1)){
alert(index +  " item");
/*                            highlightedList.push(item.name);
                            //find any existing highlight class and remove
                            $('.highlight').removeClass('highlight');
                            //find this name and add ".highlight"
                            $('ol#namelist li#' + item.name).addClass('highlight');*/
                       // }//FIND id and hten child
                        //$('#namelist').children('.onename-section')
                    });

                    //add CSS class="active" around each item of array, starting from index 0
                    $scope.highlightedList = highlightedList;
                }, userTimeIntervalMS);
            }

         $scope.changeTimeInterval = function(){
             userTimeIntervalMS = $scope.userTimeInterval * 1000;
         }

        })

  //DONT USE THIS ONE
        .controller("timerCtrl", function($scope) {
            $scope.hello="helloTimerCtrl";
            //------------my code
            //user submits time interval they want in minutes and seconds
            //var userTimeInterval = $scope.userTimeInterval;  //object with min and sec property
            var userMin = parseInt(userTimeInterval.min);
            var userSec = parseInt(userTimeInterval.sec);
            var userTimeIntervalMS = ((userMin * 60) + userSec) * 1000; //must set ng-model and change to milliseconds
           /* setInterval(function () {

                // set the date you are counting down to
                var timeNow = new Date().getTime();
                //!***!!!!GET DATE NOW()


                var targetTime = timeNow + userTimeIntervalMS;

                var secondsDifference = (targetTime - timeNow) / 1000;  //divide by 1000 because the difference is in milliseconds and we want seconds

                var minutesLeft = parseInt((secondsDifference / 60), 10);
                var secondsLeft = parseInt((secondsDifference % 60), 10);  //get remainder of seconds that don't evenly fit into minutes or 69 sec

                //use these variables to display on client side
                $scope.countdownMin = minutesLeft;
                $scope.countdownSec = secondsLeft;

            }, userTimeIntervalMS);*/
        })

        .controller("ToDoController", function($scope){
            $scope.hello="helloTodo";
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

