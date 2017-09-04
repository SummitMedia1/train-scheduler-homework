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
     frequency: frequency,
};


if(trainName.length > 0 && destination.length > 0 && firstTrain.length > 0 && frequency.length > 0) {
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

     // Calculate time
    var timeDifference = moment().diff(moment(start,"hh:mm"), "minutes");
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




/*
  // Initialize Firebase
var config = {
  apiKey: "AIzaSyBAOJ9b7g4q-j9iXfauDmEA8GucGkqjvcc",
  authDomain: "fir-trainapp.firebaseapp.com",
  databaseURL: "https://fir-trainapp.firebaseio.com",
  storageBucket: "fir-trainapp.appspot.com",
  messagingSenderId: "183389769681"
};
firebase.initializeApp(config);
var database = firebase.database();
$('#addTrainBtn').on("click", function() {
  // take user input
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequencyInput").val().trim();
  // to create local temporary object to hold train data
  var newTrain = {
      name: trainName,
      place: destination,
      ftrain: firstTrain,
      freq: frequency
    }
    // uploads train data to the database
  database.ref().push(newTrain);
  console.log(newTrain.name);
  // clears all the text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");
  // Prevents moving to new page
  return false;
});
//  Created a firebase event listner for adding trains to database and a row in the html when the user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  // Now we store the childSnapshot values into a variable
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().ftrain;
  var frequency = childSnapshot.val().freq;
  // first Train pushed back to make sure it comes before current time
  var firstTimeConverted = moment(firstTrain, "HH:mm");
  console.log(firstTimeConverted);
  var currentTime = moment().format("HH:mm");
  console.log("CURRENT TIME: " + currentTime);
  // store difference between currentTime and fisrt train converted in a variable.
  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  console.log(firstTrain);
  console.log("Difference in Time: " + timeDiff);
  // find Remainder of the time left and store in a variable
  var timeRemainder = timeDiff % frequency;
  console.log(timeRemainder);
  // to calculate minutes till train,we store it in a variable
  var minToTrain = frequency - timeRemainder;
  // next train
  var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
  $("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
});
*/
