const request = require('request');


const getLatLng = (direccion) => {
    return new Promise((resolve, reject) => {
        const google_key = 'AIzaSyC8JulQyzQyesxD3W03pMkD3maYxfZk_7g';
        const encodeUrl = encodeURI(direccion);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeUrl}&key=${google_key}`;

        request.get(url, (err, response, body) => {
            if(err) return reject(err);
            //console.log(response.headers['content-type']);
            const body_parse = JSON.parse(body);
            if(body_parse.status === 'ZERO_RESULTS') return reject(`no hay resultados para la ciudad ${direccion}`)
            const result = body_parse.results[0];
            const { formatted_address } = result;
            const {lat, lng} = result.geometry.location;
            resolve({
                direccion: formatted_address,
                lat,
                lng
            })
        });
    });
}

module.exports = { getLatLng };