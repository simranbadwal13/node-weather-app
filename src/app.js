const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geoCode = require('./utils/geocode');
const forecastCode = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set handlebars engine and view locations
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Simranjeet Singh'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Simranjeet Singh'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helperText: 'This is beautiful text',
        title: 'Help',
        name: 'Simranjeet Singh'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecastCode(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorText: 'Help article not found!!',
        title: 'Error',
        name: 'Simranjeet Singh'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errorText: 'Page not found!!',
        title: 'Error',
        name: 'Simranjeet Singh'
    });
});

app.listen(port, () => {
    console.log(`Server running on ${port}!`)
})