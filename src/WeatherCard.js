export default class WeatherCard{
    constructor(parrent, data, weatherArr, Stand){
        const sunrise = new Date((data.sys.sunrise-data.timezone)*1000);
        const sunset = new Date((data.sys.sunset-data.timezone)*1000);
        let src = weatherArr[data.weather[0].description.toLowerCase()] || Stand;
        const dayL = ((data.sys.sunset-data.timezone)*1000)- ((data.sys.sunrise-data.timezone)*1000);
        const dayLong = new Date(dayL);
        const todayDate = new Date();
        const month = (todayDate.getMonth()+1).toString().length<2?'0'+(todayDate.getMonth()+1).toString(): (todayDate.getMonth()+1).toString();

parrent.innerHTML += 
        
`
    <div class="card bigDig blue lighten-2">
        <div class="card-image">
          <img src="${src !== undefined ? src : Stand}">
        </div>
        <div class=""call>
        <div class="card-content">
            <span class="card-title">Today is ${todayDate.getDate()}.${month}.${todayDate.getFullYear()} </span>
            <h5>City: ${data.name}</h5>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class = "icon"></img>
            <p>${data.weather[0].description[0].toUpperCase()+data.weather[0].description.substring(1)}</p>
            <p>Temperature: ${data.main.temp}</p>
            <p>Feels like: ${data.main.feels_like}</p>
            <p>Sunrise: ${sunrise.getHours()}:${sunrise.getMinutes()}</p>
            <p>Sunset: ${sunset.getHours()}:${sunset.getMinutes()}</p>
            <p>Length of the day: ${dayLong.getHours()}:${dayLong.getMinutes()}</p>
        </div>
        <div/>
      </div>
`
    }
}