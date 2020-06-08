const request = require('request');

const geoCode = (address, callback) => {
    const geocodeURl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicHJpb25jZWJhZHdhbCIsImEiOiJja2F3Y2RxZDUwazJqMnFwY3VhdGc2eG95In0.Q6vOYYs0cxi7eWryOk9guA&limit=1';
    request({ url: geocodeURl, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect location service.', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location.', undefined);
        } else {
            const latitude = response.body.features[0].center[1];
            const longitude = response.body.features[0].center[0];
            const location = response.body.features[0].place_name;
            callback(undefined, {
                latitude,
                longitude,
                location
            });
        }
    });
}

module.exports = geoCode;