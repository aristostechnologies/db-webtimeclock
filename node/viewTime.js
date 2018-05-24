//Not functional. If you can solve it, please do!
(function () {
"use strict";
var mysql = require('mysql');
/**
* @private
*
* @return {object}
*/

function viewTime() {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "brackets_timer_data"
    });

    con.connect(function(err) {
      if (err) {
          console.log(err);
      } else {
        console.log("Connected!");
      }
        con.query("SELECT * FROM work_sessions", function (err, result, fields) {
            if (err) {
                console.log(err);
            }
            //I need to get the result from here
         });
        });
      //And return it here so I can pass the variable to main.js
}

 /**
 * Initializes the test domain with several test commands.
 * @param {DomainManager} domainManager The DomainManager for the server
*/
    function init(domainManager) {
        if (!domainManager.hasDomain("view")) {
            domainManager.registerDomain("view", {major: 0, minor: 1});
        }
        domainManager.registerCommand(
            "view",       // domain name
            "viewTime",    // command name
            viewTime,   // command handler function
            false,          // this command is synchronous in Node
            "Returns time entry results.",
            [{}],
            [{name: "results", // return values
                type: "object",
              description: "Time entry results"}]
        );
    }
exports.init = init;

}());