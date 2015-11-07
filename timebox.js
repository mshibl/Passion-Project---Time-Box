var button = "<a id='start-timebox-app' class='btn btn-sm sidebar-button'>Set Time-Boxing</a>";
var minutes = 24;
var minutesReset = 24;
var seconds = 5; // seconds set to 5 for testing purposes, should be 59
var resume = true;


$('div.only-with-full-nav').append(button);

$('#start-timebox-app').on('click',function(){
  $('#start-timebox-app').hide();
  $('div.only-with-full-nav').append("<div id=timebox-app><h4>Time Box</h4> <form id='set-time-box'> <label>Minutes: </label> <input id='time-box-minutes-limit' type='number' min='1' max='60' placeholder='25'> <input id='start-timebox-button' class='btn btn-sm sidebar-button' type='submit' value='Start!'> </form></div>");
})

$('div.only-with-full-nav').on('submit','#set-time-box',function(e){
  e.preventDefault();
  $('#set-time-box').hide();
  $('#timebox-app').append("<div id='timer'> <span id='timer_mnts'></span>:<span id='timer_scds'></span> </div>");
  $('#timebox-app').append("<button class='btn btn-sm sidebar-button' id='time-box-pause' type='button'>Pause</button>")
  $('#timebox-app').append("<button class='btn btn-sm sidebar-button' id='time-box-reset' type='button'>Reset</button>")
  if($('#time-box-minutes-limit').val()){
    minutes = parseInt($('#time-box-minutes-limit').val()) -1;
    minutesReset = parseInt($('#time-box-minutes-limit').val()) -1;
  }
  $('#timer_mnts').html(minutes);
  $('#timer_scds').html(seconds);
  setInterval(myTimer, 1000);
})

$('div.only-with-full-nav').on('click','#time-box-pause',function(){
  resume = !resume;
  $('#time-box-pause').text(function(i,text){
    return text === 'Resume' ? 'Pause' : 'Resume';
  })
})

$('div.only-with-full-nav').on('click','#time-box-reset',function(){
  if (confirm('this will reset the timer') == true){
    resetTimer();
  };
})

function myTimer(){
  if(resume == true){
    if(minutes == 0 && seconds == 0){
      if (confirm("Time limit reached!\n\nCommit your work and take a break!\n\n\nDo you wish to reset the timer?") == true){
        resetTimer();
      }
    }
    if(seconds == 0){
      // alert("Time limit reached!\n\nCommit your work and take a break!\n\n\nDo you wish to reset the timer?"); // This is for testing
      seconds = 60
      minutes -= 1
      $('#timer_mnts').html(minutes);

      // document.getElementById('timer_mnts').innerHTML = minutes;
    }
    $('#timer_scds').html(seconds - 1);
    seconds -= 1;
  }
}

function resetTimer(){
  seconds = 60;
  minutes = minutesReset;
  $('#timer_scds').html(seconds-1);
  $('#timer_mnts').html(minutes);
}







  // alert('this is working')
  // $('p').attr('class','collapsable');
  // $('h3').append(' <button type="button" class="collapse_bttn">testing</button>')
  // $('h3').append("<button id='testingbutton' class='testingbutton' type='button'>Start timer</button>")


  // $('#timer').countdown({startTime: "01:12:32:55"});

  // var s = document.createElement("script");
  // s.type = "text/javascript";
  // s.src = "countdown.js";
  // $("body").append("<script> </script>")



  // $('.testingbutton').on('click',function(){
  //     myVar = setTimeout(function(){alert('life is good')}, 3000)
  // })


  // $(".collapse_bttn").click(function(){
  //     $(".collapsable").toggle();
  // });
