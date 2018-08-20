var database = firebase.database();

$("#submit").click(function (event) {
    event.preventDefault();

    if ($("#first_train_time").val().trim() !== ""
        && $("#frequency").val().trim() !== "" && $("#train_name").val().trim() !== "" && $("#destination").val().trim() !== "") {
        var train_name = $("#train_name").val().trim();
        var destination = $("#destination").val().trim();
        var first_train_time = $("#first_train_time").val().trim();
        var frequency = $("#frequency").val().trim();

        database.ref().push({
            train_name, destination, first_train_time, frequency
        });

        $("#train_name").val("");
        $("#destination").val("");
        $("#first_train_time").val("");
        $("#frequency").val("");
    }
    else {
        alert("Please fill in all necessary information!");
    }
})

database.ref().on("child_added", function (snapshot) {
    var data = snapshot.val();

    // var currentTime = moment();
    // var ok = moment(currentTime).format("HH:mm");
    // var okok = moment(currentTime, "HH:mm");
    var first = moment(data.first_train_time, "HH:mm");
    var diffTime = moment().diff(first, "minutes");
    var remainder = diffTime % data.frequency;
    var minutesAway = data.frequency - remainder;
    var nextTrain = moment().add(minutesAway, "minutes").format("hh:mm a");

    if (diffTime < 0) {
        minutesAway = diffTime * -1;
        nextTrain = first.format("hh:mm a");
    }

    $("tbody").append(
        `<tr>
            <td>${data.train_name}</td>
            <td>${data.destination}</td>
            <td>${data.frequency}</td>
            <td>${nextTrain}</td>
            <td>${minutesAway}</td>
        </tr>`
    );
})