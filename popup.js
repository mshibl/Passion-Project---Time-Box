$(document).ready(function(){
  var minutes;
  var minutesReset;
  var seconds;
  var resume = true;
  var timer;

  // Test if timer was already running
  chrome.storage.sync.get('timerRunning',function(res){
    if (res.timerRunning == true){
        chrome.storage.sync.get(['start', 'minutes'], function(res) {
          var timePassed = (Date.now() - res.start) / 1000
          if (timePassed > res.minutes) {
            chrome.storage.sync.set({'timerRunning': false}, function() {
            $('#timebox-app').show();
            clearInterval(timer);
          })
        } else {
          $('#timer').show();
          timer = setInterval(myTimer, 1000);
        }
      })
    } else {
      $('#timebox-app').show();
    }
  })

  // Initializing Timer:
  $('form').on('submit',function(e){
    e.preventDefault();
    console.log('we are here')
    $('#set-time-box').hide();
    $('#timer').show();

    minutes = parseInt($('#time-box-minutes-limit').val());
    minutesReset = parseInt($('#time-box-minutes-limit').val()) -1;

    chrome.storage.sync.set({'timerRunning': true,'minutes': minutes * 60 , 'start': Date.now()})

    $('#timer_mnts').html(minutes);
    $('#timer_scds').html(0);

    timer = setInterval(myTimer, 1000);
  })

  // Pausing Timer:
  $('div.only-with-full-nav').on('click','#time-box-pause',function(){
    resume = !resume;
    $('#time-box-p`1ause').text(function(i,text){
      return text === 'Resume' ? 'Pause' : 'Resume';
    })
  })

  // Reseting Timer:
  $('div.only-with-full-nav').on('click','#time-box-reset',function(){
    if (confirm('this will reset the timer') == true){
      resetTimer();
    };
  });

  function resetTimer(){
    seconds = 60;
    minutes = minutesReset;
    $('#timer_scds').html(seconds-1);
    $('#timer_mnts').html(minutes);
  }

  // Running Timer:
  function myTimer(){
    // if(resume == true){
    //   if(minutes == 0 && seconds == 0){
    //     if (confirm("Time limit reached!\n\nCommit your work and take a break!\n\n\nDo you wish to reset the timer?") == true){
    //       resetTimer();
    //     }
    //   }

      chrome.storage.sync.get(['start', 'minutes'], function(res) {
        var timePassed = (Date.now() - res.start) / 1000
        if (timePassed > res.minutes) {
          chrome.storage.sync.set({'timerRunning': false}, function() {
            // alert('times up bub');
            clearInterval(timer);
          })
        } else {
          var minutesLeft = Math.floor((res.minutes - timePassed) / 60)
          var secondsLeft = Math.floor((res.minutes - timePassed) % 60)

          $('#timer_mnts').html(minutesLeft);
          $('#timer_scds').html(secondsLeft);
        }
        // message('Settings saved');
      })

    //   if(seconds == 0){
    //     // alert("Time limit reached!\n\nCommit your work and take a break!\n\n\nDo you wish to reset the timer?"); // This is for testing
    //     seconds = 60
    //     minutes -= 1
    //     $('#timer_mnts').html(minutes);

    //     // document.getElementById('timer_mnts').innerHTML = minutes;
    //   }
    //   $('#timer_scds').html(seconds - 1);
    //   seconds -= 1;
    // }
  }
});
