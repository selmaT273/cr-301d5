'use strict';

// Weather data:
// {
//   "time": 1567792089082,
//   "summary": "Foggy in the morning."
// },
// Weather object:
// {
//   time: Sep 27, 2018,
//   weather: "Foggy",
// }
function Weather(obj) {
  this.time = new Date(obj.time);
  this.weather = obj.summary;

  // for (let key in obj) {
  //   this[key] = obj[key];
  // }
}

Weather.prototype.render = function() {
  let template = $('#weather-template').html();
  let markup = Mustache.render(template, this);
  $('#weather-container').append(markup);
}

const ajaxSettings = {
  method: 'get',
  dataType: 'json'
};

$.ajax('city-weather-data.json', ajaxSettings)
  .then(function (ajaxResult) {
    console.log(ajaxResult);
    ajaxResult.data.forEach(weatherData => {
      let weather = new Weather(weatherData);
      console.log(weatherData);
      console.log(weather);
      weather.render();
    })
  });
