const request = require('postman-request')

const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2lkcm9ib3QyazQiLCJhIjoiY2tzNzNhbmdwMDdhejJub2Mxc2Flc3BtayJ9.2FcI_wLAec0b-AhlJepdLQ&limit=1'
    request({url, json: true}, (error, response, body) => {
        if (error){
            callback('Unable to connect to the Geo location servicesa', undefined)
        } else if (body.features.length === 0){
            callback('Unable to find the location! Please try another one',undefined)
        } else {
            callback(undefined, {
                Longtitude: body.features[0].center[0],
                Latitude: body.features[0].center[1],
                Location: body.features[0].place_name
            })
        }
    })    
}

module.exports = geocode

