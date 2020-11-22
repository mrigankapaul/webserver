// Geocoding

// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibXJpZ2Fua2FwYXVsIiwiYSI6ImNraHIxaGVjOTA2bXoycW15Z3lyNWFpMjgifQ.0eDMYXJcgZ8Mwe8yAimwrA'

// request({ url: geocodeURL, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to location services!')
//     } else if (response.body.features.length === 0) {
//         console.log('Unable to find location. Try another search.')
//     } else {
//         const latitude = response.body.features[0].center[0]
//         const longitude = response.body.features[0].center[1]
//         console.log(latitude, longitude)
//     }
// })

const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibXJpZ2Fua2FwYXVsIiwiYSI6ImNraHIxaGVjOTA2bXoycW15Z3lyNWFpMjgifQ.0eDMYXJcgZ8Mwe8yAimwrA'
    request({url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode