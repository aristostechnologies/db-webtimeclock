//Not functional. If you can solve it, please do!
(function () {
"use strict";
let mysql = require('mysql');
/**
* @private
*
* @return {object}
*/
function viewTime() {
  let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "brackets_timer_data"
  });

  return new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) {
        console.log('err while establishing connection ', err);
        reject(err);
      }
      console.log('Connected!');
      resolve();
    });
  }).then(() => {
    con.query("SELECT * FROM work_sessions", function (err, result, fields) {
      if (err) {
        console.log('err in while fetching session details ', err);
        return Promise.reject(err);
      }
      console.log(result);
      return Promise.resolve(result);
    });
  });
}
 /**
 * Initializes the test domain with several test commands.
 * @param {DomainManager} domainManager The DomainManager for the server
*/

function init(domainManager) {

  // your other code

  viewTime().then(sessions => {
    domainManager.registerCommand(
      "view",       // domain name
      "viewTime",    // command name
      sessions,   // command handler function
      false,          // this command is synchronous in Node
      "Returns time entry results.",
      [{}],
      [{
        name: "results", // return values
        type: "object",
        description: "Time entry results"
      }]
    );
  }).catch(err => {
    console.log('err in init()', err);
  });

}
exports.init = init;
}());