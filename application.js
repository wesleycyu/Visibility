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
        var results = $("<ul>").attr("id", "results-field")
        for (var i = 0; i < 7; i++) {
          $("<li>").text(data.RESULTS[i].name).addClass("location").appendTo(results);
        }
        $($results).empty();
        $(results).appendTo($results);
      },
    })
  };

  var weatherCall = function(query) {
    $.ajax ({
      url : "http://api.wunderground.com/api/afb0f7d8bcdda471/geolookup/conditions/q/IA/" + query + ".json",
      dataType : "jsonp",
      success : function(data) {
        stuff = data
        if (data.current_observation != undefined) {
          var location = data['location']['city'];
          var temp_f = data['current_observation']['temp_f'];
          alert("Current temperature in " + location + " is: " + temp_f);
        } else {
            var location = data.response.results[0]["city"] + ", " + data.response.results[0]["country_name"];
            alert("There's no weather data for " + location);
          }
      }
    });
  };



  $(document).on("click", ".location", function(){
    var location = $(this).text().split(",")[0].replace(" ", "_");
    weatherCall(location);
  })

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