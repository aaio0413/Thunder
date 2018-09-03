const member = require("../data/members.js");
const path = require('path');
// const fs = require('fs')
// const membersList = member.membersList;

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/members", function(req, res) {
    res.json(member);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/members", function(req, res) {
    console.log('this is req body', req.body);
    // console.log('this is res' , res);

    var greatMatch = {
        name: "",
        image: "",
        matchDifference: 0
    };

    var usrData 	= req.body;
    var usrName 	= usrData.name;
    var usrImage 	= usrData.image;
    var usrScores 	= usrData.scores;
    var totalDifference = 0;

    //loop through the member data array of objects to get each friends scores

    for(i = 0; i < member.length-1; i++){

        console.log(member[i].name);
        totalDifference = 0;
        //loop through that friends score and the users score and calculate the 
        // absolute difference between the two and push that to the total difference variable set above

        for(var j = 0; j < 10; j++) {
            // We calculate the difference between the scores and sum them into the totalDifference
            totalDifference += Math.abs(parseInt(usrScores[j]) - parseInt(member[i].scores[j]));
            // If the sum of differences is less then the differences of the current "best match"

            if (totalDifference <= greatMatch.matchDifference) {

                // Reset the bestMatch to be the new friend. 

                greatMatch.name = member[i].name;
                greatMatch.image = member[i].photoUrl;
                greatMatch.matchDifference = totalDifference;
            }
        }
    }
       
    member.push(usrData);
    console.log('push in survery data');
    console.log('member object here:', member);
    console.log('-----------------------------');

    res.json(greatMatch);
    console.log('The great match info:', greatMatch);
    console.log('The great match info:', greatMatch.name);

    // let filePath = __dirname + 'app/data/members.js';
    // request.on('end', function (){
    //     fs.appendFile(filePath, body, function() {
    //         respond.end();
    //     });
    // });

        
  });

    

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    member = [];

    console.log("The member list is deleted.", json(member));
  });
};