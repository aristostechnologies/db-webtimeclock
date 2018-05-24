(function () {
"use strict";
var mysql = require('mysql');
/**
* @private
*
* @param {string} hours
* @param {string} minutes
* @param {string} seconds
*/
function saveTime(hours, minutes, seconds) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "brackets_timer_data"
    });

    var time = hours + ":" + minutes + ":" + seconds;
    var now = new Date();
    var month = "";
    if(now.getMonth() < 10) {
        month = "0" + now.getMonth();
    }
    var day = "";
    if(now.getDay() < 10) {
        day = "0" + now.getDay();
    }
    var hour = now.getHours();
    if(hour < 10) {
        hour = "0" + hour;
    }
    var minute = now.getMinutes();
    if(minute < 10) {
        minute = "0" + minute;
    }
    var second = now.getSeconds();
    if(second < 10) {
        second = "0" + second;
    }
    var datetime = now.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO work_sessions (time_entry, timestamp) VALUES ('" + time + "', '" + datetime + "')";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    });
}
 /**
 * Initializes the test domain with several test commands.
 * @param {DomainManager} domainManager The DomainManager for the server
*/
    function init(domainManager) {
        if (!domainManager.hasDomain("simple")) {
            domainManager.registerDomain("simple", {major: 0, minor: 1});
        }
        domainManager.registerCommand(
            "simple",       // domain name
            "saveTime",    // command name
            saveTime,   // command handler function
            false,          // this command is synchronous in Node
            "Returns the total or free memory on the user's system in bytes",
            [{name: "hours", // parameters
                type: "string",
                description: "Hours"},
             {name: "minutes", // parameters
                type: "string",
                description: "Minutes"},
             {name: "seconds", // parameters
                type: "string",
                description: "Seconds"},
            ]
        );
}
exports.init = init;
    
}());