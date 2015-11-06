$(document).ready(function(){
  $('button').on('click',function(){
    while(true){
      alert('life is good')
      myVar = setTimeout(myFunction, 3000)
    }
  })

  // alert('hello world');
  chrome.tabs.getSelected(null,function(tab){
    $('#auto-commit-button').click(function(e){
      d = document
      debugger;
      var f = d.createElement('form');
      f.action = 'http://127.0.0.1:9393/autocommit';
      f.method = 'post';
      var i = d.createElement('input');
      i.type = 'hidden';
      i.name = 'url';
      i.value = tab.url;
      f.appendChild(i);
      d.body.appendChild(f);
      f.submit();
    })
  })
});







// document.addEventListener('DOMContentLoaded', function() {
//   var checkPageButton = document.getElementById('checkPage');
//     alert('hello world')
//     $('').on("click",function(){

//     chrome.tabs.getSelected(null, function(tab) {
//       d = document;

//       var f = d.createElement('form');
//       f.action = 'http://127.0.0.1:9393/autocommit';
//       f.method = 'post';
//       var i = d.createElement('input');
//       i.type = 'hidden';
//       i.name = 'url';
//       i.value = tab.url;
//       f.appendChild(i);
//       d.body.appendChild(f);
//       f.submit();
//     });
//   }, false);
// }, false);
