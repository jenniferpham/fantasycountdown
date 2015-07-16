/**
 * Created by Jennifer on 2/12/2015.
 */

/**
 * Created by johnduong on 2/11/15.
 */

    /*
    1.  Register
        if --> form js --> html
        else{
        userProfile = {name:, email:, password};
        }
    2.
     */

var app = angular.module("nameModule",["firebase"]);
var ref = new Firebase("https://jenndatabase.firebaseio.com/");

app.controller("LoginController", ["$scope", "$firebase", "$element",
    function ($scope, $firebase, $element) {

        var loginForm = $($element);
        $scope.userLogin = {};

        $scope.isInvalid = function() {
            console.log("checking validity");
            return !loginForm.form('validate form');
        };



        $scope.login = function() {

            console.log("Login Function");
            if (this.isInvalid()) {
                console.log("validity is invalid");
            } else {
                console.log("validity is valid");
                console.log(this.userLogin);
                login($scope.userLogin.email, $scope.userLogin.password);
            }

        };

        function login(loginEmail, loginPassword) {
            $scope.loading = true;
            ref.authWithPassword({
                email    : loginEmail,
                password : loginPassword
            }, function(error, authData) {
                if (error) {
                    console.log("Login Failed!", error.message);
                    //todo alert login error
                    alert("Login Failed!", error);

                    cancelLoad();
                    console.log("after i cancel loading on failed login", $scope.loading);


                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    alert("login success");
                    cancelLoad();
                    console.log("after cancel loading on success", $scope.loading);


                }
            });
        }


        //testing in controller
        function cancelLoad(){
            $scope.$apply(function () {
                $scope.loading = false;
            });
        }


    }]);

app.controller("RegisterController", ["$scope", "$firebase", "$element",
    function ($scope, $firebase, $element) {

        var usersRef = new Firebase("https://jenndatabase.firebaseio.com/users");
        var registrationForm = $($element);  //jQuery element
        console.log("<<element>> ",$element);

        //Model $scope
        $scope.user = {};  //user object
        $scope.loading = false;
        $scope.isInvalid = function() {
            return !registrationForm.form('validate form');
        };

        $scope.register = function() {


            if (this.isInvalid()) {
                console.log("register error in validating form");
            } else {
                //TODO: Username Form Field should automatically check database for same username
                this.loading = true;

                //firebase
                //temporary object - created this so that the key properties are set in Firebase
                var userProfile = {
                    email: $scope.user.email,
                    givenname: $scope.user.givenname,
                    surname: $scope.user.surname
                };

                console.log("*** userProfile:");
                createUserAccount($scope.user.email, $scope.user.password, userProfile);

            }

        };

        //testing in controller
        function cancelLoad(){
            $scope.$apply(function () {
                $scope.loading = false;
            });
        }

        function createUserAccount(userEmail, userPassword, userProfile){





            ref.createUser({
                email    : userEmail,
                password : userPassword
            }, function(error, userData) {   //callback response
                if (error) {
                    alert("User account already taken");

                } else {
                    alert("Successfully registered user with uid:", userData.uid);

                    //Method to update "users" profile in Firebase
                    createProfile(userData.uid, userProfile);
                }
                $scope.user = null;
                cancelLoad();

            });



        }


        function userCreated(userId, success) {
            if (!success) {
                alert('user ' + userId + ' already exists!');
            } else {
                alert('Successfully created ' + userId);

                //load in next page here..

            }
            $scope.user = null;
            cancelLoad();
        }

        function createProfile(userId, userData) {

            //Firebase code for creating "users" table and updating
            usersRef.child(userId).transaction(function() {
                    //console.log("inside current user data: ", currentUserData);
                    //if (currentUserData === null) {
                    return userData;
                    //}

                },
                function(error, committed) {
                    console.log("Now I'm in this second callback");
                    console.log("error:", error);
                    console.log("committed:", committed);
                    if (!error) {
                        userCreated(userId, committed);
                    } else {
                        console.log("Profile creation error: ",error);
                    }
                });
        }

    }] );