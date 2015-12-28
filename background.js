var timerProcess;
var startTime;
var timeLimit;
var timePassed;
// var breakTimerOn = false;

function initTimer(){
  timerProcess = setTimeout(notification, (timeLimit * 1000))
}

function timerReset(){
  startTime = Date.now();
}

function notification(){
var notification=chrome.notifications.create("", {
    type:    "basic",
    iconUrl: "icons/48PX.png",
    title:   "Time Limit Reached",
    // message: 'Timer will restart after the ' + breakLimit/60 + ' minutes break',
    // contextMessage: "It's about time...",
    contextMessage: 'Timer will restart after the ' + breakLimit/60 + ' minutes break',
    buttons: [{
        title: "Stop the timer",
        iconUrl: "icons/stopButton.png"
    }]
   }, function(id) {
    myNotificationID = id;
});
  // var notification = confirm('Time Limit Reached!\nTimer will restart after the ' + breakLimit/60 + ' minutes break\n\nChoose cancel if you wish to stop ..');
  // if (notification == true){
    chrome.storage.sync.set({'timeLimit': breakLimit , 'startTime': Date.now(), 'breakTime': true})
    setTimeout(function(){
      chrome.storage.sync.set({'timeLimit': timeLimit , 'startTime': Date.now(), 'breakTime': false});
      alert('Break time is over! \n Time Box will restart now');
      initTimer();
    }, (breakLimit * 1000));
  // } else {
  //   chrome.storage.sync.set({'timerRunning': false})
  // }

}

// Connection from popup.js when user starts the timer
chrome.extension.onConnect.addListener(function(port){
  console.log('connection with background established')
  port.onMessage.addListener(function(msg){
    switch(msg){
      case 'stop':
        clearTimeout(timerProcess);
        break;
      default:
        chrome.storage.sync.get(['timeLimit','breakLimit'],function(timerData){
          breakLimit = timerData.breakLimit;
          timeLimit = timerData.timeLimit;
          initTimer();
        });
    }
  })
})
