const request = require('postman-request')


const forcast =(Longtitude,Latitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=e087cf0f5c84d4f94caf13fa3251e948&query=' + Latitude+',' + Longtitude +'&units=f'
    request({url, json:true}, (error, response, body) => {
        if(error){
            callback("unable to connect to weather services",undefined)
        } else if (body.error)  {
            callback("unable to find location",undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently "+ body.current.temperature + " degree out. Outside is feel like " + body.current.feelslike + " degree.\n" + "The Humidity is "+ body.current.humidity +"%")
        }
    }) 
}

module.exports = forcast