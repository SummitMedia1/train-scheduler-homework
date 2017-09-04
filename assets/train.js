$(document).ready(function(){

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDNq44foTYudZo0kRmGgEnVIWlN4iYZh_s",
    authDomain: "trainschedule-homework.firebaseapp.com",
    databaseURL: "https://trainschedule-homework.firebaseio.com"
  };

  firebase.initializeApp(config);

var database = firebase.database();

// Current day and time, just because I want to show it:

var now = moment().format('LLLL');
    $(".currentTime").text(now);

//****************************************************************************************** >>
//****************************************************************************************** >>

$('#trainSubmission').on('click', function(){
     console.log("Submit");

// KeyMaster input data

var trainName = $('#trainNameInput').val().trim();
var destination = $('#destinationInput').val().trim();
var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
var frequency = $('#frequencyInput').val().trim();

// Add trains to schedule

var addTrain = {
     trainName: trainName,
     destination: destination,
     firstTrain: firstTrain,
     frequency: frequency
};


if(trainName.length > 0 && destination.length > 0 && firstTrain.length > 0 &&
 frequency.length > 0) {

database.ref().push(addTrain);

//Clears the input boxes after entry taken in database

     $('#trainNameInput').val("");
     $('#destinationInput').val("");
     $('#timeInput').val("");
     $('#frequencyInput').val("");

     return false;
}
});

database.ref().on('child_added', function(childSnapshot) {

     var name = childSnapshot.val().trainName;
     var dest = childSnapshot.val().destination;
     var start = childSnapshot.val().firstTrain;
     var freq = childSnapshot.val().frequency;

     // Calculate time differentials
    var timeDifference = moment().diff(moment(start,"hh:mm"));
    console.log("The time difference is " + timeDifference + ".");
    var currentTime = moment().format("hh:mm");
    console.log("The current time is " + currentTime + ".");
    var timeRemaining = timeDifference % freq;
    var timeMinsAway = freq - timeRemaining;

     // Calculate next arrival
    var timeNext = moment().add(timeMinsAway,'m');

     // Set time difference variables
    var next = moment(timeNext).format("hh:mm A");
    var away = timeMinsAway;
  
     $(".table > tbody").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + next + 
          "</td><td>" + away +  "</td></tr>");

});
});