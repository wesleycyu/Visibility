$(function () {
  console.log("document loaded!");

  var $search = $("#search");
  var $results = $("#results");
  var searchCall = function(query) {
    $.ajax ({
        url: "http://autocomplete.wunderground.com/aq?query=" + query + "&cb=?",
        type: "get",
        dataType: "jsonp",
        success: function(data){
          mydata = data.RESULTS
          var results = $("<ul>")
          console.log
          for (var i = 0; i < data.RESULTS.length; i++) {
            console.log(data.RESULTS[i].name)
            $("<li>").text(data.RESULTS[i].name).appendTo(results);
          }
          $(results).appendTo($results);
        },
      })
  };

  $($search).keypress(function(e) {
    if(e.which == 13) {
      var query = $($search).val()
      searchCall(query);
    }
  })

  $("#search-icon").on("click", function() {
      var query = $($search).val()
      searchCall(query);
  })

  $("#github-icon").on("click", function(){
    window.open('https://github.com/wesleycyu/visibility', '_blank');
  })
})