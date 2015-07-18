(function () {
    'use strict';

    //must match ng-app on html side
    angular.module("ffcountdown", [])
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


        }) //closes angular controller

        .controller("nameCtrl", function($scope) {
            //    randomize names
            //function randomizer() {
                var nameArray = ['John', 'Jack', 'Jill', 'Leo', 'Teri', 'Ty', 'Allison'];
                var tempArr = [];
                for (var i = 0; i < nameArray.length - 1; i++) {
                    //// The following line removes one random element from arr and pushes it onto tempArr (.splice(1st # is index # being removed, 2nd # is how many)
                    //var randomNumber = Math.floor(Math.random() * nameArray.length);
                    //var randomName = nameArray.slice(randomNumber, randomNumber + 1).toString(); //sets a random name within array
                    //nameArray.splice(randomNumber, 1); //removes it from original array
                    //tempArr.push(randomName);

                    //removes one random element and
                    tempArr.push(nameArray.splice(Math.floor(Math.random() * nameArray.length), 1)[0]);
                }
                // Push the remaining item onto tempArr
                $scope.randomNames = tempArr;
            //}
        })

        .controller("timerCtrl", function($scope){
            var timeInterval = $scope.timeInterval;
            function countdownTiming(){
                // set the date we're counting down to
                var target_date = new Date("July 15, 2015").getTime();

// variables for time units
                var days, hours, minutes, seconds;

// get tag element
                var countdown = document.getElementById("countdown");

// update the tag with id "countdown" every 1 second
                setInterval(function () {

                    // find the amount of "seconds" between now and target
                    var current_date = new Date().getTime();
                    var seconds_left = (target_date - current_date) / 1000;

                    // do some time calculations
                    days = parseInt(seconds_left / 86400);
                    seconds_left = seconds_left % 86400;

                    hours = parseInt(seconds_left / 3600);
                    seconds_left = seconds_left % 3600;

                    minutes = parseInt(seconds_left / 60);
                    seconds = parseInt(seconds_left % 60);

                    // format countdown string + set tag value
                    countdown.innerHTML = days + "d, " + hours + "h, "
                        + minutes + "m, " + seconds + "s";

                }, 1000);
            }

            //------------my code
            setInterval(function () {

                // set the date you are counting down to
                var timeNow = new Date().getTime();
                //***!!!!GET DATE NOW()

                var userTimeInterval = $scope.userTimeInterval; //must set ng-model
                var targetTime = timeNow + userTimeInterval;

                var secondsDifference = (targetTime - timeNow) / 1000;  //divide by 1000 because the difference is in milliseconds and we want seconds

                var minutesLeft = parseInt((secondsDifference / 60), 10);
                var secondsLeft = parseInt((secondsDifference % 60), 10);  //get remainder of seconds that don't evenly fit into minutes or 69 sec

                //use these variables to display
                $scope.countdownMin = minutesLeft;
                $scope.countdownSec = secondsLeft;

            });
/*
                //dont let them go over 60 min
                //most likely wont use but just in case
                $scope.countdownHrs = "";
                //if hours exist, then change $scope.countdownHours to a number. Otherwise it's blank.
                if (minutesLeft >= 60){

                }
*/



                //-----------Maui code

// variables for time units
                var days, hours, minutes, seconds;

// get tag element
                var countdown = document.getElementById("countdown");

// update the tag with id "countdown" every 1 second
                setInterval(function () {

                    // find the amount of "seconds" between now and target
                    var current_date = new Date().getTime();
                    var seconds_left = (target_date - current_date) / 1000;

                    // do some time calculations
                    days = parseInt(seconds_left / 86400);
                    seconds_left = seconds_left % 86400;

                    hours = parseInt(seconds_left / 3600); //3600 sec in 1 hr
                    seconds_left = seconds_left % 3600;

                    minutes = parseInt(seconds_left / 60);
                    seconds = parseInt(seconds_left % 60);

                    // format countdown string + set tag value
                    countdownDays.innerHTML = days;
                    countdownHr.innerHTML = hours;
                    countdownMin.innerHTML = minutes;
                    countdownSec.innerHTML = seconds;

                }, 1000);

            }


//Just add this HTML into your page
// <span id="countdownDays"></span>
// <span id="countdownHr"></span>
// <span id="countdownMin"></span>
// <span id="countdownSec"></span>
        })

        .filter('reverse', function() {
            return function(items) {
                return items.slice().reverse();
            };
        })


 }());
