$(function () {
  console.log("document loaded!")
  var $search = $("#search");
  $($search).keypress(function(e) {
    if(e.which == 13) {
      alert("you pressed enter!")
    }
  })

})