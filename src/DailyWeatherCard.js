export default class DailyWeatherCard{
    constructor(parrent, dat){
       
        for(let i=0;i<7;i++){
            
         let date = new Date((dat.daily[i].dt+dat.timezone_offset)*1000);
         const month = (date.getMonth()+1).toString().length<2?'0'+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();
parrent.innerHTML += 
`
    <div class="card blue lighten-2 dayD">
        <div class="card-content white-text">
        <span class="card-title">${date.getDate()}.${month}</span>
                <p id="dailyCity">${dat.timezone.slice(dat.timezone.indexOf('/')+1)}</p>
                <img src = "http://openweathermap.org/img/wn/${dat.daily[i].weather[0].icon}@2x.png" class = "icon">
                <p>Daily temperature: ${dat.daily[i].temp.day} </p>
                <p>Nightly temperatyre: ${dat.daily[i].temp.night} </p>
                <p>Weather: ${dat.daily[i].weather[0].main}</p>
                <p>Description: ${dat.daily[i].weather[0].description}</p>
                <p>Wind speed: ${dat.daily[i].wind_speed}</p>
        </div>        
    </div>
`
    }
}
}