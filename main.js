/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, browser: true */
/*global $, define, brackets */
define(function(require, exports, module) {

    var CommandManager = brackets.getModule("command/CommandManager"),
    Menus = brackets.getModule("command/Menus"),
    PanelManager = brackets.getModule("view/WorkspaceManager"),
    ExtensionUtils          = brackets.getModule("utils/ExtensionUtils"),        
    AppInit = brackets.getModule("utils/AppInit"),
    NodeDomain = brackets.getModule("utils/NodeDomain");

    var TIMERDASH_EXECUTE = "timerdash.execute";
    //var VIEWTIME_EXECUTE = "viewtimeentries.execute";
    var panel;
    //var timepanel;
    var panelHTML = require("text!timer.html");
    //var viewPanel = require("text!viewtime.html");

    function log(s) {
            console.log("[webdash-timer-db] "+s);
    }
    //NodeJS for saving time
    var saveTime = new NodeDomain("simple", ExtensionUtils.getModulePath(module, "node/database"));
    
    //NodeJS for viewing time. Not yet functional
    //var viewTime = new NodeDomain("view", ExtensionUtils.getModulePath(module, "node/viewTime"));
//Start of the clock
    var Interval ;
    
    
function handleTimer() {

        if(panel.isVisible()) {
            panel.hide();
            CommandManager.get(TIMERDASH_EXECUTE).setChecked(false);
        } else {
            panel.show();
            CommandManager.get(TIMERDASH_EXECUTE).setChecked(true);
        }
        
  //Time for calculations 
  var seconds = 00; 
  var tens = 00;
  var minutes = 00;
  var hours = 00;
        
  //Time for saving   
  var formSeconds = "00";
  var formMinutes = "00";
  var formHours = "00";

  //The times to be displayed
  var appendMinutes = document.getElementById("minutes");
  var appendHours = document.getElementById("hours");
  var appendSeconds = document.getElementById("seconds");
    
  //Buttons  
  var buttonStart = document.getElementById('button-start');
  var buttonStop = document.getElementById('button-stop');
  var buttonSave = document.getElementById('button-save');
  var buttonReset = document.getElementById('button-reset');
  

buttonStart.onclick = function() {
    
     clearInterval(Interval);
     Interval = setInterval(startTimer, 10);
  }
  
buttonStop.onclick = function() {
       clearInterval(Interval);
  }
  
//Stops the clock when user clicks "Save Hours" button
buttonSave.onclick = function() {
    clearInterval(Interval);
    saveTime.exec("saveTime", formHours, formMinutes, formSeconds);
  }

buttonReset.onclick = function() {
    clearInterval(Interval);
    tens = "00";
  	seconds = "00";
    minutes = "00";
    hours = "00";
  	appendSeconds.innerHTML = seconds;
    appendMinutes.innerHTML = minutes;
    appendHours.innerHTML = hours;
    formSeconds = "00";
    formMinutes = "00";
    formHours = "00";
  }
  
  function startTimer () {
    tens++;  
    
    if (tens > 99) {
      //console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      formSeconds = "0" + seconds;
      tens = 0;
    }
    
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
      formSeconds = seconds;
    }
    
    if (seconds > 59) {
      //console.log("minutes");
      minutes++;
      appendMinutes.innerHTML = "0" + minutes;
      formMinutes = "0" + minutes;
      seconds = 0;
      appendSeconds.innerHTML = "0" + 0;
      formSeconds = "00";
      }
      if (minutes > 9) {
        appendMinutes.innerHTML = minutes;
          formMinutes = minutes;
      }
      if (minutes > 59) {
      //console.log("hours");
      hours++;
      appendHours.innerHTML = "0" + hours;
          formHours = "0" + hours;
      minutes = 0;
      appendMinutes.innerHTML = "0" + 0;
          formMinutes = "00";
    }
      if (hours < 1) {
          appendHours.innerHTML = "0" + 0;
          formHours = "00";
      }
      if(hours > 9) {
          appendHours.innerHTML = hours;
          formHours = hours;
      }
  }
    
 

}
/* This function is the beginning of what I have for displaying work session entries on a bottom panel */
/*function viewTimeEntries() {
    
       if(timepanel.isVisible()) {
            timepanel.hide();
            CommandManager.get(VIEWTIME_EXECUTE).setChecked(false);
        } else {
            timepanel.show();
            CommandManager.get(VIEWTIME_EXECUTE).setChecked(true);
        
            viewTime.exec("viewTime")
                .done(function (results) {
                    console.log(result);
                    
                    for(var x = 0; x < results.length; x++) {
                        document.getElementById("tbody").innerHTML = "<tr><td>" + results[x].id + "</td><td>";
                    }
                }).fail(function (err) {
                    console.error("[brackets-simple-node] failed to run simple.viewTime", err);
                });
        }
    
        
}*/
    AppInit.appReady(function () {

        log("The time clock.");
        ExtensionUtils.loadStyleSheet(module, "timer.css");
        CommandManager.register("Toggle Timer", TIMERDASH_EXECUTE, handleTimer);
        //CommandManager.register("View Time Entries", VIEWTIME_EXECUTE, viewTimeEntries);

        var menu = Menus.addMenu("Time Clock", "isaacdew.timeclock-db.timeclock");
        menu.addMenuItem(TIMERDASH_EXECUTE);
        //menu.addMenuItem(VIEWTIME_EXECUTE);

        panel = PanelManager.createBottomPanel(TIMERDASH_EXECUTE, $(panelHTML),50);
        
        //timepanel = PanelManager.createBottomPanel(VIEWTIME_EXECUTE, $(viewPanel),800);

    });
});
