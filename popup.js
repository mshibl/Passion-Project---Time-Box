$(document).ready(function(){
  var timerProcess;

  function updateTimerView(){
    chrome.storage.sync.get(['startTime','timeLimit'],function(timerData){
        timePassed = (Date.now() - timerData.startTime) / 1000
        minutesLeft = Math.floor((timerData.timeLimit - timePassed) / 60)
        secondsLeft = Math.floor((timerData.timeLimit - timePassed) % 60)

        $('#timer_mnts').text(minutesLeft);
        $('#timer_scds').text(secondsLeft);
    })
  }

  function startTimer(){
    $('#timer').show();
    $('#time-box-setter').hide();
    timerProcess = setInterval(updateTimerView,1000)
  }

  function showSetter(){
    $('#timer').hide();
    $('#time-box-setter').show();
  }

  // Test if timer was already running
  chrome.storage.sync.get(['timerRunning','startTime','timeLimit','breakTime'],function(timerData){
    if (timerData.timerRunning == true){
      if (timerData.breakTime == true){
        $('h4').html('Break Time').css('color','#6CC644')
      }
      updateTimerView();
      startTimer();
    } else {
      showSetter();
    }
  })

  // Initializing Timer:
  $('form').on('submit',function(e){
    e.preventDefault();

    var port = chrome.extension.connect({name: "Start Background Timer"});
    chrome.storage.sync.set({'timerRunning': true, 'timeLimit': (parseInt($('#time-box-minutes-limit').val())*60), 'startTime': Date.now(), 'breakLimit':(parseInt($('#time-box-break-limit').val())*60)})
    port.postMessage('start')

    updateTimerView();
    startTimer()
  })

  // Stop button
  $('body').on('click','#time-box-stop',function(){
    var port = chrome.extension.connect({name: "Stop Background Timer"});
    port.postMessage('stop')
    clearInterval(timerProcess);
    chrome.storage.sync.set({'timerRunning': false}, function() {
    $("#time-box-setter").show();
    $('#timer').hide();
    })
  })
});
