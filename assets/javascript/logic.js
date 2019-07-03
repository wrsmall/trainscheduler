var config = {
    apiKey: "AIzaSyDuaWtMAqOI_6GO9-vi7_6p1tDhNYKla5E",
    authDomain: "trainschedu-870f9.firebaseapp.com",
    databaseURL: "https://trainschedu-870f9.firebaseio.com",
    projectId: "trainschedu-870f9",
    storageBucket: "trainschedu-870f9.firebaseapp.com",
    messagingSenderId: "993779793345",
    appId: "1:993779793345:web:30e2b033bfd895e1"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#addTrain").on("click", function (event) {
    event.preventDefault();

    var train = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#trainFrequency").val().trim();

    var newTrain = {
        trainId: train,
        destined: destination,
        first: firstTrain,
        freq: frequency
    };
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.trainId);
    console.log(newTrain.destined);
    console.log(newTrain.first);
    console.log(newTrain.freq);


    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#trainFrequency").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    var key = childSnapshot.key
    console.log(key);
    // Store everything into a variable.
    var addTrain = childSnapshot.val().trainId;
    var addDestination = childSnapshot.val().destined;
    var addFirstTrain = childSnapshot.val().first;
    var addFrequency = childSnapshot.val().freq;

    var trainFreq = addFrequency;
    console.log(addFrequency)
    var startTime = addFirstTrain;
    console.log(addFirstTrain)
    var convert = moment(startTime, "hh:mm").subtract(1, "years");
    console.log(convert)
    var timeDiff = moment().diff(moment(convert), "minutes");
    console.log(parseInt(timeDiff))
    var remainInter = timeDiff % trainFreq;
    console.log(remainInter)
    var minutesRemain = trainFreq - remainInter;

    console.log(minutesRemain)

    var nextTrain = moment().add(minutesRemain, "minutes").format("hh:mm");

    console.log(nextTrain)

    // Employee Info
    console.log(addTrain);
    console.log(addDestination);
    console.log(addFirstTrain);
    console.log(addFrequency);


    // Create the new row
    var newRow = $(`<tr data='info'>`).append(
        $("<td>").text(addTrain),
        $("<td>").text(addDestination),
        $("<td>").text(addFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(minutesRemain),
        $("<td>").html(`<button data-key='${key}' class='remove rounded bg-danger'>Remove Train</button>`),

    );

    // 
    $("body").on("click", '.remove', function () {
        database.ref().child($(this).attr('data-key')).remove();
        $($(this).closest("tr")).remove();
    });


    $("#trainTable > tbody").append(newRow);

});




