/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'Weather',
  subtitle:'Fetching...'
});

// Display the Card
card.show();

var ajax = require('ajax');

// Construct URL
var cityName = 'london';
var URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName;

// Make the request
ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    // Success!
    console.log('Successfully fetched weather data!');
    
     // Extract data
    var location = data.name;
    var temperature = Math.round(data.main.temp - 273.15) + 'C';
    var temp_min = Math.round(data.main.temp_min - 273.15) + 'C';
    var temp_max = Math.round(data.main.temp_max - 273.15) + 'C';

    // Always upper-case first letter of description
    var description = data.weather[0].description;
    description = description.charAt(0).toUpperCase() + description.substring(1) + "\n" + String(temp_min) + "-" + String(temp_max);
    
    // Show to user
    card.subtitle(location + ', ' + temperature);
    card.body(description);
  },
  function(error) {
    // Failure!
    console.log('Failed fetching weather data: ' + error);
  }
);


