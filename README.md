# Weather API

This repo created for my Udemy Advanced iOS/Swift course.

## Installation

* Clone repo with `git clone git@github.com:onurgenes/weather-api.git`
* `cd` to directory
* Create a file named `keys.js` and add following to the file then change `YOUR_DARKSKY_API_KEY` with your own API key
````
var apikey = 'YOUR_DARKSKY_API_KEY';

module.exports.apikey = apikey;
````
* Execute `npm install` on terminal
* Start server with `node server.js`
* Test server with going `localhost:3000` on browser
* Profit!