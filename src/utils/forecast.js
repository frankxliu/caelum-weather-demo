const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6f8da82004f9803b4ee63e2d3b0187d1&query='+ lat + ',' + long +'&units=m'
    
    // body is destructured from (response)
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error){
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = forecast