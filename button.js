var button = "<div id='timebox-app'><a id='auto-commit-button' class='btn btn-sm sidebar-button'>Set Time-Boxing</a></div>";
var minutes = 24;
var minutesReset = 24;
var seconds = 5; // seconds set to 5 for testing purposes, should be 59
var resume = true;


$('div.only-with-full-nav').append(button);

$('#timebox-app').on('click',function(){
  $('#auto-commit-button').hide();
  $('div.only-with-full-nav').append("<h4>Time Box</h4> <form id='set-time-box'> <label>Minutes: </label> <input id='time-box-minutes-limit' type='number' min='1' max='60' placeholder='25'> <input type='submit' value='Start!'> </form>");
})

$('div.only-with-full-nav').on('submit','#set-time-box',function(e){
  e.preventDefault();
  $('#set-time-box').hide();
  $('div.only-with-full-nav').append("<div id='timer'> <span id='timer_mnts'></span>:<span id='timer_scds'></span> </div>");
  $('div.only-with-full-nav').append("<button id='time-box-pause' type='button'>Pause</button>")
  $('div.only-with-full-nav').append("<button id='time-box-reset' type='button'>Reset</button>")
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
  alert('this will reset minutes'); // replace with confirmation button
  seconds = 59;
  minutes = minutesReset;
  $('#timer_mnts').html(minutes);
})

function myTimer(){
  if(resume == true){
    $('#timer_scds').html(seconds - 1);
    seconds -= 1;
    if(seconds == 0){
      if(minutes == 0){
        alert("Time limit reached!\n\nCommit your work and take a break!");
      }
      alert("Time limit reached!\n\nCommit your work and take a break!"); // This is for testing, it
      seconds = 60
      minutes -= 1
      $('#timer_mnts').html(minutes);
      // document.getElementById('timer_mnts').innerHTML = minutes;
    }
  }
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
