function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];

  return `${day} ${hour}:${minutes}`;
}

let dateElement = document.querySelector("#currentTime");
let date = new Date();
dateElement.innerHTML = formatDate(date);

function city(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-name");
  let newCityvalue = cityInput.value;
  let newCity = document.querySelector("h1");
  newCity.innerHTML = newCityvalue;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", city);

let fahrenheit = document.querySelector("#fahrenheitSymbol");
let celsius = document.querySelector("#celsiusSymbol");
fahrenheit.addEventListener("click", changeFahrenheit);
celsius.addEventListener("click", changeCelsius);

function changeFahrenheit() {
  let fahrenheit = document.querySelector("#currentTemp");
  fahrenheit.innerHTML = 65;
}

function changeCelsius() {
  let celsius = document.querySelector("#currentTemp");
  celsius.innerHTML = 18;
}

function currentWeather(response) {
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let currentDescription = document.querySelector("#currentDescription");
  currentDescription.innerHTML = response.data.weather[0].description;
  let h1 = document.querySelector("h1");
  let cityName = response.data.name;
  h1.innerHTML = cityName;
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

let currentCity = document.querySelector("#currentLocation");
currentCity.addEventListener("click", currentLocation);

function newCitytemp(response) {
  let cityTemp = document.querySelector("#currentTemp");
  cityTemp.innerHTML = Math.round(response.data.main.temp);
  let currentDescription = document.querySelector("#currentDescription");
  currentDescription.innerHTML = response.data.weather[0].description;
  let city = document.querySelector("h1");
  let cityName = response.data.name;
  city.innerHTML = cityName;
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

let formInput = document.querySelector("#search-form");
formInput.addEventListener("submit", handleCity);
