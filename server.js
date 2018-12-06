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

app.get('/current', (req, res) => {
    var params = _.pick(req.body, ['latitude', 'longitude']);
    const url = `https://api.darksky.net/forecast/${keys.apikey}/${params.latitude},${params.longitude}`;
    
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
            var currentTemp = parsed.currently.temperature;
            var regions = parsed.alerts[0].regions;

            res.status(200).send({
                currentTemp: currentTemp,
                regions: regions
            });
        });
    }).on('error', (error) => {
        res.status(501).send(error);
    });
});

app.listen(port, () => {
    console.log(`Started weather-api at ${port}`);
});