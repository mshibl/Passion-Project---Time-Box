var timerProcess;
var startTime;
var timeLimit;
var timePassed;


function timer(){
  timePassed = (Date.now() - startTime) / 1000
  if (timePassed > timeLimit) {
    console.log('timer done!')
    chrome.storage.sync.set({'timerRunning': false}, function() {
      // This is the alert that will be displayed to the user once the timer is done
      // alert('Time Limit Reached! \n Take a break!')
      confirm('Time Limit Reached!\nTimer will restart after the ' + breakLimit/60 + ' minutes break\n\nClick cancel if you wish to stop ..')
      // notification.show();
      clearInterval(timerProcess);
    })
  }
}

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
        startTime = Date.now()
        chrome.storage.sync.set({'timerRunning': true, 'timeLimit': timeLimit, 'startTime': startTime})
        timerProcess = setInterval(timer, 1000)
    }
  })
})
