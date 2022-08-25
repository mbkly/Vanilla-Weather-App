function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hour}:${minutes}`;
}

let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = formatDate();

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class= "row">`;
  let days = ["Thurs", "Fri", "Sat", "Sun"];

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col">
      <div class="forecast-day">${formatForecastDay(forecastDay.dt)}</div>
      <div class="forecast-temperature">
      <span class="forecast-temperature-max">${Math.round(
        forecastDay.temp.max
      )}°</span> 
      <span class="forecast-temperature-min">${Math.round(
        forecastDay.temp.min
      )}°</span> 
      </div>
      <img
      src = "http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png";
      alt = "centered image"; 
      class = "weather-icons";
      width= "42"
      />
    </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>` + `<hr />`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "cccaf84b4649d473f992ccb16b046ba9";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function city(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-name");
  let newCityvalue = cityInput.value;
  let newCity = document.querySelector("h1");
  newCity.innerHTML = newCityvalue;
}

function changeFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#currentTemp");
  let fahrenheitLink = document.querySelector("#fahrenheitLink");
  let celsiusLink = document.querySelector("#celsiusLink");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  fahrenheit.innerHTML = Math.round(fahrenheitTemperature);
}

function changeCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#currentTemp");
  let celsiusLink = document.querySelector("#celsiusLink");
  let fahrenheitLink = document.querySelector("#fahrenheitLink");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  celsius.innerHTML = Math.round(celsiusTemperature);
}

function currentWeather(response) {
  let currentTemp = document.querySelector("#currentTemp");
  let currentDescription = document.querySelector;
  let h1 = document.querySelector("h1");
  let cityName = response.data.name;
  ("#currentDescription");
  let humidity = document.querySelector("#humidity");
  let humidityPercentage = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#currentTime");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);

  currentTemp.innerHTML = celsiusTemperature;
  currentDescription.innerHTML = response.data.weather[0].description;
  h1.innerHTML = cityName;
  humidity.innerHTML = humidityPercentage;
  wind.innerHTML = windSpeed;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function handlePosition(position) {
  let apiKey = "cccaf84b4649d473f992ccb16b046ba9";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(currentWeather);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function newCitytemp(response) {
  let cityTemp = document.querySelector("#currentTemp");
  let currentDescription = document.querySelector("#currentDescription");
  let city = document.querySelector("h1");
  let cityName = response.data.name;
  let humidity = document.querySelector("#humidity");
  let humidityPercentage = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#currentTime");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.main.temp);

  cityTemp.innerHTML = celsiusTemperature;
  currentDescription.innerHTML = response.data.weather[0].description;
  city.innerHTML = cityName;
  humidity.innerHTML = humidityPercentage;
  wind.innerHTML = windSpeed;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function handleCity(position) {
  let apiKey = "cccaf84b4649d473f992ccb16b046ba9";
  let cityInput = document.querySelector("#city-name");
  let city = cityInput.value;
  let newCity = document.querySelector("h1");
  newCity.innerHTML = city;
  let unit = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(url).then(newCitytemp);
}

let fahrenheit = document.querySelector("#fahrenheitLink");
let celsius = document.querySelector("#celsiusLink");
fahrenheit.addEventListener("click", changeFahrenheit);
celsius.addEventListener("click", changeCelsius);

let currentCity = document.querySelector("#currentLocation");
currentCity.addEventListener("click", currentLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", city);

let formInput = document.querySelector("#search-form");
formInput.addEventListener("submit", handleCity);

let celsiusTemperature = null;
