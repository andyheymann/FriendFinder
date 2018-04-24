// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");
var path = require("path");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/freinds", function(req, res) {
    var newName = req.body.name;
    var newPhoto = req.body.photo;
    var newScores = req.body.scores;

    var bestmatch = FindBestFriend(newName, newPhoto, newScores);

    friendsData.push(req.body);

    var str =
      "{" +
      '"' +
      "name" +
      '"' +
      ": " +
      '"' +
      friendsData[bestmatch].name +
      '"' +
      "," +
      '"' +
      "photo" +
      '"' +
      ": " +
      '"' +
      friendsData[bestmatch].photo +
      '"' +
      "}";

    res.contentType("application/json");

    var personJSON = JSON.stringify(str);
    res.send(personJSON);
  });

  function FindBestFriend(newName, newPhoto, newScores) {
    var bestScore = 1000;
    var bestMatch = "";
    var sum = 0;
    for (var i = 0; i <= friendsData.length - 1; i++) {
      for (var j = 0; j < friendsData[i].scores.length - 1; j++) {
        sum += Math.abs(newScores[j] - friendsData[i].scores[j]);
        console.log(
          friendsData[i].name +
            ": " +
            newScores[j] +
            "-" +
            friendsData[i].scores[j] +
            " = " +
            Math.abs(newScores[j] - friendsData[i].scores[j])
        );
      }
      console.log("");

      if (sum <= bestScore) {
        bestScore = sum;
        bestMatch = i;
      }

      sum = 0;
    }

    return bestMatch;
  }
};

// ---------------------------------------------------------------------------
// I added this below code so you could clear out the table while working with the functionality.
// Don"t worry about it!
