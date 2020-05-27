const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ccad5b72dcfbdbae114863a75af6f057&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'Weather is ' + body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' c degree temperature outside.' + ' It feels like ' + body.current.feelslike + ".");
        }
    })
}

module.exports = forecast