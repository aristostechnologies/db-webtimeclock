//Not functional. If you can solve it, please do!
(function () {
"use strict";
var express = require('express');
var http = require('http');
var cors = require('cors');

//Including controller/dao for testtable
var app = express();
var connection  = require('express-myconnection'); 
var mysql = require('mysql');
var errorHandler = require('errorhandler');


/**
* @private
*
*/
 // all environments
    app.set('port', process.env.PORT || 4300);
    app.use(cors());
    // development only
    if ('development' == app.get('env')) {
      app.use(errorHandler());
    }

    app.use(
        connection(mysql,{
            host: 'localhost',
            user: 'root',
            password : 'root',
            port : 3306, //port mysql
            database:'brackets_timer_data'
        },'pool')
    );
function viewTime() {
    app.get('/workSessions', function(req, res){
        req.getConnection(function(err,connection){   
          var query = connection.query('SELECT * FROM work_sessions ORDER BY id DESC LIMIT 35',function(err,rows){
            if(err)
              console.log("Error Selecting : %s ",err );

            res.send(JSON.stringify(rows));
          });
      });
    });
    //app.use(app.router);
    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
}

    
 /**
 * Initializes the test domain with several test commands.
 * @param {DomainManager} domainManager The DomainManager for the server
*/

function init(domainManager) {
    if (!domainManager.hasDomain("view")) {
            domainManager.registerDomain("view", {major: 0, minor: 1});
    }

  // your other code
    domainManager.registerCommand(
      "view",       // domain name
      "viewTime",    // command name
      viewTime,   // command handler function
      false          // this command is asynchronous in Node
    );

}
exports.init = init;
}());