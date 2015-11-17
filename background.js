var timerProcess;
var startTime;
var timeLimit;
var timePassed;
var breakTimerOn = false;


function timerReset(){
  startTime = Date.now();
}

function notification(){
  var notification = confirm('Time Limit Reached!\nTimer will restart after the ' + breakLimit/60 + ' minutes break\n\nChoose cancel if you wish to stop ..');
  if (notification == true){

  } else {
    chrome.storage.sync.set({'timerRunning': false})
  }

}

// function timer(){
//   timePassed = (Date.now() - startTime) / 1000
//   if (timePassed > timeLimit) {
//     if (breakTimerOn){
//       breakTimerOn = false;

//     }
//     console.log('timer done!')
//     chrome.storage.sync.set({'timerRunning': false}, function() {
//       // This is the alert that will be displayed to the user once the timer is done
//       var notification = confirm('Time Limit Reached!\nTimer will restart after the ' + breakLimit/60 + ' minutes break\n\nChoose cancel if you wish to stop ..')
//       if (notification == true){
//         breakTimerOn = true;
//         setTimeout(timerReset,breakLimit);
//       } else {
//         clearInterval(timerProcess);
//       }
//     })
//   }
// }

// Connection from popup.js when user starts the timer
chrome.extension.onConnect.addListener(function(port){
  console.log('connection with background established')
  port.onMessage.addListener(function(msg){
    switch(msg){
      case 'stop':
        clearInterval(timerProcess);
        break;
      default:
        breakLimit = msg[1] * 60
        timeLimit = msg[0] * 60
        // startTime = Date.now()
        chrome.storage.sync.set({'timerRunning': true, 'timeLimit': timeLimit, 'startTime': startTime})
        timerProcess = setTimeout(notification, (timeLimit * 1000))
    }
  })
})
