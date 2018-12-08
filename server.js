const express = require('express');
const bodyparser = require('body-parser');
const http = require('https');
const _ = require('lodash');
const keys = require('./keys');

const app = express();
app.use(bodyparser.json());

const port = 3000;

app.get('/', (req, res) => {
    res.status(200).send({
        status: 'API up and running'
    });
});

app.get('/currently', (req, res) => {
    var params = _.pick(req.body, ['latitude', 'longitude']);
    const url = `https://api.darksky.net/forecast/${keys.apikey}/${params.latitude},${params.longitude}?units=si`;

    http.get(url, response => {
        var body = '';
        if (response.statusCode >= 400 && response.statusCode <= 600) {
            return res.status(response.statusCode).send({
                error: 'something went wrong'
            });
        };
        response.on('data', (d) => {
            body += d;
        });
        response.on('end', () => {
            var parsed = JSON.parse(body);
            var currently = parsed.currently;
            var currentTemp = currently.temperature;
            var summary = currently.summary;
            var precipType = currently.precipType;
            var precipProbability = currently.precipProbability;
            var apparentTemperature = currently.apparentTemperature;

            res.status(200).send({
                currentTemp: currentTemp,
                summary: summary,
                precipType: precipType,
                precipProbability: precipProbability,
                apparentTemperature: apparentTemperature
            });
        });
    }).on('error', (error) => {
        res.status(501).send(error);
    });
});

app.get('/daily', (req, res) => {
    var params = _.pick(req.body, ['latitude', 'longitude']);
    const url = `https://api.darksky.net/forecast/${keys.apikey}/${params.latitude},${params.longitude}?units=si`;
    console.log(url)
    http.get(url, response => {
        var body = '';
        if (response.statusCode >= 400 && response.statusCode <= 600) {
            return res.status(response.statusCode).send({
                error: 'something went wrong'
            });
        };
        response.on('data', (d) => {
            body += d;
        });
        response.on('end', () => {
            var parsed = JSON.parse(body);
            var daily = parsed.daily.data;
            res.status(200).send(daily);
        });
    }).on('error', (error) => {
        res.status(501).send(error);
    });
});

app.listen(port, () => {
    console.log(`Started weather-api at ${port}`);
});