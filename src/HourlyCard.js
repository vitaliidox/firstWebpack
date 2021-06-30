export default class HourlyWeatherCard{
    constructor(parr, d,horlyNow, weatherArr){
        function degToCard(value) { value = parseFloat(value); if (value <= 11.25) return 'N'; value -= 11.25; var allDirections = ['NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N']; var dIndex = parseInt(value/22.5); return allDirections[dIndex] ? allDirections[dIndex] : 'N'; }
parr.innerHTML="";
        for(let i=0;i<5;i++){
        const time = new Date(d.list[i].dt_txt);
parr.innerHTML += 
`
    <div class="card blue lighten-2">
        <div class="card-content white-text">
            <span class="card-title">${d.city.name}</span>
                <p>Time: ${time.getHours()}:${time.getMinutes()}</p>
                <img src = "http://openweathermap.org/img/wn/${d.list[i].weather[0].icon}@2x.png" class = "icon">
                <p></p>
                <p>${d.list[i].weather[0].description[0].toUpperCase()+d.list[i].weather[0].description.substring(1)}</p>
                <p>Temperature max: ${d.list[i].main.temp_max}</p>
                <p>Temperature min: ${d.list[i].main.temp_min}</p>
                <p>Feels like: ${d.list[i].main.feels_like}</p>
                <p>Wind direction: ${degToCard(d.list[i].wind.deg)}</p>
        </div>        
    </div>
`
    }
}
}