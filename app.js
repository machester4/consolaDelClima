const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Direccion de la ciudad para obtener el clima',
        demand: true
    }
}).argv;

const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');
const colors = require('colors/safe');


async function main() {
    const geo_data = await lugar.getLatLng(argv.direccion).catch((err) => console.log(err));
    const clima_tiempo = await  clima.getClima(geo_data.lat, geo_data.lng);
    printer(clima_tiempo);
}

function printer(data) {
    console.log(colors.green('==========================================================='));
    console.log(colors.yellow('             ⛈  🌤  ⛅️  CLIMA  🌦  🌧  ☁️               '));
    console.log(colors.green('==========================================================='));

    console.log(`\n${colors.blue(`Temp Actual: ${data.temp}c`)} - ${colors.red(`Temp Max: ${data.temp_max}c`)} - ${colors.cyan(`Temp Min: ${data.temp_min}c\n`)}`);
}


main();




