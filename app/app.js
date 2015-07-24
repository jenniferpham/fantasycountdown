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


            //refresh timer
            var startCountdown = function () {
                // set the date we're counting down to
                var target_date = new Date().getTime() + userTimeIntervalMS;

                // variables for time units
                var days, hours, minutes, seconds;

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

                    minutes = parseInt(seconds_left / 60) | 0;
                    seconds = parseInt(seconds_left % 60) | 0;

                    seconds = seconds < 10 ? "0" + seconds : seconds;

                    var countdownMin = document.getElementById('countdownMin');
                    var countdownSec = document.getElementById('countdownSec');

                    // format countdown string + set tag value
                    countdownMin.innerHTML = minutes;
                    countdownSec.innerHTML = seconds;
                    //$scope.countdownMin = minutes;
                    //$scope.countdownSec = seconds;


                }, 1000); //closes setInterval

            }; //closes var startCountdown

            var stopTimer = function(){
                clearInterval(startCountdown);
            };
            $scope.startTimer = function(){

                for (var i = 0; i < maxLoops; i++) {
                    if (numberLoops <= maxLoops) {
                        numberLoops++;
                        alert("numberLoops: " + numberLoops + " maxLoops: " + maxLoops);
                        startCountdown();
                    } //closes if statement
                    else {
                        //stop the interval after it runs the max # of loops
                        stopTimer();
                    }
                }

            }; // closes $scope.startTimer

            $scope.pauseTimer = clearInterval(startCountdown);
            $scope.goThroughNames = function(){

                if (numberLoops % totalPicks === 0){
                    numberRound ++;
                    $scope.numberRound = numberRound;
                }
                var totalRounds = $scope.totalRounds;

                //set interval for iterating through team names and highlighting each one
                setInterval(function () {
                    nameArray = $scope.nameArray;
                    var wentAlready = [];
                    $scope.numberRound = numberRound;
                    //PUSH ONE ITEM OF NAMEARRAY whose indexnumber matches numberLoop INTO THE highlightedList array;
                    angular.forEach(nameArray, function(item, index) {
                       if (index === (numberRound - 1)){
                            //alert(item.name + " #Round" + numberRound +" total Rounds: " + totalRounds);
                           //$scope.activeTeam = item.name;
                           var activeTeam = document.getElementById('activeTeam');
                           activeTeam.innerText = item.name;
                           //wentAlready.push(item.name);
                           //$scope.wentAlready =wentAlready;
                            //find any existing highlight class and remove
                            //$('.highlight').removeClass('highlight');
                            //find this name and add ".highlight"
                            $('li#' + item.name).style.color = "red";
                                //.addClass('highlight');
                       // }//FIND id and hten child
                        //$('#namelist').children('.onename-section')
                        } //closes IF statement
                    });

                    //add CSS class="active" around each item of array, starting from index 0
                  //  $scope.highlightedList = highlightedList;
                }, userTimeIntervalMS);
            };

        }) //ends controller

        .filter('reverse', function() {
            return function(items) {
                return items.slice().reverse();
            };
        })

}());

