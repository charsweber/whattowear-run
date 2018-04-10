function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + 
    ", Longitude: " + position.coords.longitude);
    lat = position.coords.latitude;
	long = position.coords.longitude;
    getTemp(lat, long);
}

getLocation();

var weatherurl = "https://api.openweathermap.org/data/2.5/weather?lat=";
var weatherconfig = "ac9cf7fcb52a1a8a3613881c8ef99587";	

function getTemp(lat, long) { 
	$.ajax({
	  dataType: "json",
	  url: weatherurl + lat + "&lon=" + long + "&appid=" + weatherconfig + "&units=imperial",
	  beforeSend: function(){
        	$('#loader').show();
      },
	  success: function(result) {
	  	console.log(result);
	  	var city = result.name;
	  	var temp = Math.floor(result.main.temp);
	  	var weatherDescription = result.weather[0].description;
	  	// get in icon id http://openweathermap.org/weather-conditions
	  	$('.question-1').prepend('<h3>it\'s ' + temp + '&deg; F with ' + weatherDescription + ' in '+ city + ' right now.</h3>');
	  }, 
	  complete: function(){
	    $('#loader').hide();
	  },
	});
}

var timeNow = new Date();
var hour = timeNow.getHours();
var mins = timeNow.getMinutes();


$(document).ready(function() {
	$('#intro button').click(function() {
		$('#intro').slideUp(1000);
		$('.question-1').removeClass('hidden');
	})

	$('.question-1 button').click(function() {
		$('.question-1').slideUp(1000);
		$('.question-2').removeClass('hidden');
	})

	$('.question-2 button').click(function() {
		$('.question-2').slideUp(1000);
		$('.loading').removeClass('hidden');
		$('.loading h2').delay(3000).fadeOut();
	})

	console.log("is it " + hour + ":" + mins + " right now?");
	$('.question-2 h2').text("is it " + hour + ":" + mins + " right now?");

	/* 
		after 3 seconds, hide "we're thinking" and add in a paragraph that says ""
	*/
});

// favicon should be some kind of shoe/umbrella thing or something

// http://gyre.umeoce.maine.edu/data/gomoos/buoy/php/variable_description.php?variable=wind_2_speed
// https://openweathermap.org/weather-conditions

// display loader window for 3 seconds and then remove, hopefully weather will display by then!