
import Stand from './img/stand.jpg'
import DailyWeatherCard from './DailyWeatherCard'
import WeatherCard from './WeatherCard'
import HourlyWeatherCard from './HourlyCard'
import CityCard from './CityCard'
import BrokenClouds from './img/broken_clouds.jpg'
import ClearSky from './img/clear_sky.jpg'
import Fog from './img/fog.jpg'
import LightRain from './img/light_rain.jpg'
import Moderate from '/img/moderate_rain.jpeg'
import Overcast from './img/overcast_clouds.jpg'
import Scattered from './img/scattered_clouds.jpg'
import Snow from './img/snow.jpg'

import './styles/style.css'

let navButton = document.querySelector("ul").querySelectorAll('a');
let section = document.querySelectorAll('.section');
navButton.forEach((e, i) => {
    e.addEventListener("click", function () {
      section.forEach((l) => {
        l.style.display = "none";
      });
      section[i].style.display = "flex";
    });
  });

let weatherArr = {'scattered clouds':Scattered, 'light rain':LightRain, 'moderate rain':Moderate,'clear sky':ClearSky,'snow':Snow, 'mist':Fog, 'overcast clouds':Overcast, 'broken clouds':BrokenClouds,};
let btn = document.querySelector('.getWeather');
let inp = document.querySelector('input');
let today = document.querySelector('#now');
let horlyNow = document.querySelector('#hourlyNow')
let sevDays = document.querySelector('#sevDays');
section[0].style.display = 'flex';

function degToCard(value) { value = parseFloat(value); if (value <= 11.25) return 'N'; value -= 11.25; var allDirections = ['NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N']; var dIndex = parseInt(value/22.5); return allDirections[dIndex] ? allDirections[dIndex] : 'N'; }
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Ваше текущее местоположение:');
  console.log(`Широта: ${crd.latitude}`);
  console.log(`Долгота: ${crd.longitude}`);
  console.log(`Плюс-минус ${crd.accuracy} метров.`);
        
        const fixedLat = crd.latitude >= 0 ? `+${crd.latitude}` : crd.latitude;
        const fixedLon = crd.longitude >= 0 ? `+${crd.longitude}` : crd.longitude;

  fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${fixedLat}${fixedLon}/nearbyCities?radius=100`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "2ecc6a18f1msh149a8c93469a116p1ff3e3jsn92ea038f0326",
		"x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
	}
})
.then(response => 
	response.json()
)
.then(data=>{
    console.log(data);
    inp.value = data.data[0].city;
    btn.click();

})
.catch(err => {
	console.error(err);
});

};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);


btn.addEventListener('click', function(){
    otherCities.innerHTML='';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inp.value}&units=metric&appid=d252a812218572d49d4bc5ad0a4df521`)
    .then(response =>
        response.json())
    .then (data=> {
        [...today.children].forEach(e=>today.removeChild(e))
        new WeatherCard(today, data, weatherArr, Stand)

        fetch(
            `http://api.openweathermap.org/data/2.5/forecast?q=${inp.value}&units=metric&appid=d252a812218572d49d4bc5ad0a4df521`)
            .then((resp) => resp.json())
            .then((d) => {
                new HourlyWeatherCard(horlyNow, d, weatherArr)
                console.log(d);
        })
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=d252a812218572d49d4bc5ad0a4df521`)
        .then(resps =>
            resps.json())
        .then (dat=> {
            console.log(dat);
            [...sevDays.children].forEach(e=>sevDays.removeChild(e))
            new DailyWeatherCard(sevDays, dat, weatherArr)
        })
        
        console.log(data.coord.lat, data.coord.lon)
        const fixedLat = data.coord.lat >= 0 ? `+${data.coord.lat}` : data.coord.lat;
        const fixedLon = data.coord.lon >= 0 ? `+${data.coord.lon}` : data.coord.lon;

        fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${fixedLat}${fixedLon}/nearbyCities?radius=100`, {
            "method": "GET",
            "headers": {

                "x-rapidapi-key": "2ecc6a18f1msh149a8c93469a116p1ff3e3jsn92ea038f0326",
                "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
            }
        })
        .then(response => response.json())
        .then(places =>{
            places.data.forEach((el)=>{

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${el.latitude}&lon=${el.longitude}&units=metric&appid=d252a812218572d49d4bc5ad0a4df521`)
            .then(resps =>
            resps.json())
            .then(nearWeather=>
                [console.log(nearWeather, '--'), new CityCard(otherCities ,nearWeather.daily[0], el)])
            })
            console.log(places)})
        .catch(err => {
            console.error(err);
        });
        console.log(data)})
         .catch(err => {
        console.error(err);
    })
})
