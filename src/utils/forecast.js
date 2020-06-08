const request = require('request');

const forecastCode = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=18b2893bcc4d17659b31644d528b747e&query=' + latitude + ',' + longitude;

    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect weather service.', undefined);
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const forecast = response.body.current;
            callback(undefined,
                `Weather is ${forecast.weather_descriptions[0]}. It's currently ${forecast.temperature} degrees out and feels like ${forecast.feelslike} degrees. There is ${forecast.precip}% chance of rain.`);
        }
    });
}

module.exports = forecastCode;
