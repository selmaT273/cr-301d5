'use strict';


// Weather data:
// {
//   "time": 1567792089082,
//   "summary": "Foggy in the morning."
// },

function Weather(obj) {
   this.time = new Date(obj.time);
   this.summary = obj.summary;
}

Weather.prototype.render = function() {
    let template = $('#weather-template').html();
    let markUp = Mustache.render(template, this);
    $('#weather-container').append(markUp);

}
const ajaxSettings = {
    method: 'get',
    dataType: 'json'
}

$.ajax('city-weather-data.json', ajaxSettings)
.then(function (ajaxResult) {
    console.log(ajaxResult);

    ajaxResult.data.forEach(weatherData => {
    let weather = new Weather(weatherData);
    weather.render();
    });
})
