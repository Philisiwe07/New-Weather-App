
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let currentDateElement = document.querySelector("#current-date");
  let iconElement = document.querySelector("#icon");
  document.body.style.backgroundColor = getBackgroundColor(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  currentDateElement.innerHTML = formatDate(new Date(response.data.time * 1000));
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon"/>`;
  temperatureElement.innerHTML = temperature;
  
  getForecast(response.data.city);
  
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector(".search-form-input");
  let city = searchInputElement.value;

  let apiKey = "t0033d45f1b2356ec4oc18a3a5f2a16d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
  
}
let temperature = 20; 
function getBackgroundColor(temperature) {
  if (temperature < 0) {
    return "lightblue";
  } else if (temperature < 15) {
    return "lightgreen";
  } else if (temperature < 25) {
    return "yellow";
  } else if (temperature < 35) {
    return "orange";
  } else {
    return "red";
  }
}
document.body.style.backgroundColor = getBackgroundColor(temperature);

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;

}
function getForecast(city) {
let apiKey = "t0033d45f1b2356ec4oc18a3a5f2a16d";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}


function displayForecast(response){

let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let forecastHTML = "";
 response.data.daily.forEach(function(day,index) {
  if (index < 5) {
    let date = new Date(day.time * 1000);
    let dayName = days[date.getDay()];
    forecastHTML = forecastHTML + `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${dayName}</div>
        <div class="weather-forecast-icon"><img src="${day.condition.icon_url}" alt="${day.condition.description}" class="weather-forecast-icon"/></div>
        </div>
        <div class="weather-forecast-temperatures">
        <div class="weather-forecast-temperature">
          <strong>${Math.round(day.temperature.maximum)}°</strong>
        </div>
        <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}º</div>
      </div>
    `;
  
  }



});
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
displayForecast();