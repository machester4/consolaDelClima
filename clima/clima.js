const request = require('request');


const getClima = (lat, lng) => {
    return new Promise((resolve, reject) => {
        const openweathermapKey = '25f77296f02ee277c2b06d4172ea82df';
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${openweathermapKey}`;
        
        request.get(url, (err, response, body) => {
            const body_parse = JSON.parse(body);
            const { pressure, humidity, temp_min, temp_max, temp} = body_parse.main;
            resolve({
                pressure,
                humidity,
                temp_max,
                temp_min,
                temp
            });
        });
    });
}

module.exports = { getClima };