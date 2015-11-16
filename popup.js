$(document).ready(function(){
  var timerProcess;

  function updateTimerView(){
    chrome.storage.sync.get(['startTime','timeLimit'],function(timerData){
      var timePassed = (Date.now() - timerData.startTime) / 1000
      var minutesLeft = Math.floor((timerData.timeLimit - timePassed) / 60)
      var secondsLeft = Math.floor((timerData.timeLimit - timePassed) % 60)

      $('#timer_mnts').html(minutesLeft);
      $('#timer_scds').html(secondsLeft);
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
  chrome.storage.sync.get(['timerRunning','startTime','timeLimit'],function(timerData){
    if (timerData.timerRunning == true){
      startTimer();
    } else {
      showSetter();
    }
  })

  // Initializing Timer:
  $('form').on('submit',function(e){
    e.preventDefault();

    var port = chrome.extension.connect({name: "Start Background Timer"});
    port.postMessage([parseInt($('#time-box-minutes-limit').val()),parseInt($('#time-box-break-limit').val())])

    startTimer()
  })

  // // Pausing Timer:
  // $('body').on('click','#time-box-pause',function(){
  //   // resume = !resume;
  //   var port = chrome.extension.connect({name: "Pause Background Timer"});

  //   if (resume){
  //     port.postMessage('resume')
  //   } else {
  //     port.postMessage('pause')
  //   }

  //   $('#time-box-pause').text(function(i,text){
  //     return text === 'Resume' ? 'Pause' : 'Resume';
  //   })
  // })

  // // Reseting Timer:
  // $('div.only-with-full-nav').on('click','#time-box-reset',function(){
  //   if (confirm('this will reset the timer') == true){
  //     resetTimer();
  //   };
  // });

  // function resetTimer(){
  //   seconds = 60;
  //   minutes = minutesReset;
  //   $('#timer_scds').html(seconds-1);
  //   $('#timer_mnts').html(minutes);
  // }

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
