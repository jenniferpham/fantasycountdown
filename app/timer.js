/**
 * Created by Jennifer on 7/23/2015.
 */
(function () {
    'use strict';

    //must match ng-app on html side
    angular.module("todo", [])

        .controller("timeCtrl", function($scope) {

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
            };

            $scope.deleteAll = function(){
                $scope.nameArray = [{name:"", orderNumber:0}];

            };
            $scope.numberRound = 0;
            $scope.numberPick = 0;
// SET TIMER
            var userTimeIntervalMS, userMin, userSec, totalPicks, totalRounds, maxLoops;
            $scope.setTime= function(){
                var userTimeInterval = $scope.userTimeInterval; //object with min and sec property
                userMin = parseInt($scope.userTimeInterval.min);
                userSec = parseInt($scope.userTimeInterval.sec);
                userTimeIntervalMS = ((userMin * 60) + userSec) * 1000; //must set ng-model and change to milliseconds
                // alert("min " + userMin + "sec " + userSec + "userTimeIntervalMS " + userTimeIntervalMS)
                $scope.userTimeIntervalMS = userTimeIntervalMS;
                $scope.userMin = userMin;
                $scope.userSec = userSec;
                totalRounds = $scope.totalRounds;
                totalPicks = $scope.totalPicks;
                maxLoops = totalPicks * totalRounds;
            };
            var numberRound = $scope.numberRound;
            var numberPick = $scope.numberPick;

            var numberLoops = 0;




            function startTimer(timeinterval, display) {
            var start = Date.now();  //starting time in milliseconds
            var diff;
            var minutes;
            var seconds;

            function timer() {
                // get the number of seconds that have elapsed since startTimer() was called
                diff = timeinterval - (((Date.now() - start) / 1000) | 0); //difference in seconds

                // does the same job as parseInt truncates the float
                minutes = (diff / 60) | 0;  //divide seconds by 60 to get minutes
                seconds = (diff % 60) | 0;  //remainder is seconds

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;

                if (diff <= 0) {
                    // add one second so that the count down starts at the full timeinterval
                    // example 05:00 not 04:59
                    start = Date.now() + 1000;
                }
            };
            // we don't want to wait a full second before the timer starts
            timer();
            setInterval(timer, 1000);
        }

            var changeColor = function (teamnameID) {
                var teamname = document.getElementById(teamnameID);
                teamname.style.color = "blue";
            };

            $scope.startTimer = function(){
                var display = document.querySelector('#timedisplay');
                startTimer(userTimeIntervalMS, display);
            }

           /* window.onload = function () {
                var fiveMinutes = 60 * 5;
                var display = document.querySelector('#timedisplay');
                startTimer(fiveMinutes, display);
            };
*/
    }); //ends controller
}()); //ends angular function ready


