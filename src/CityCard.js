export default class CityCard{
    constructor(parrent, data, place){
        parrent.innerHTML += 
`
    <div class="card city-small bigDig blue lighten-2">
        <div>
        <div class="card-content">
            <h5>City: ${place.name  }</h5>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class = "icon"></img>
            <p>${data.weather[0].description[0].toUpperCase()+data.weather[0].description.substring(1)}</p>
            <p>Temperature day: ${data.temp.day}</p>
            <p>Temperature night: ${data.temp.night}</p>
        </div>
        <div/>
      </div>
`
    }
}