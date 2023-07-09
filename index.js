let header3 = document.querySelector("h3");

let currentTime = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[currentTime.getDay()];

let hour = currentTime.getHours();
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let displayDate = `${day}, ${hour}:${minutes}`;

header3.innerHTML = displayDate;

function showCity(event) {
  event.preventDefault();
  let header1 = document.querySelector("h1");
  let cityName = document.querySelector("#city-input");

  header1.innerHTML = cityName.value;

  searchPlace(cityName.value);
}

let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", showCity);

function toFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = "57ºF";
}
let buttonFahrenheit = document.querySelector("#fahrenheit-button");
buttonFahrenheit.addEventListener("click", toFahrenheit);

function toCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = "14ºC";
}
let buttonCelsius = document.querySelector("#celsius-button");
buttonCelsius.addEventListener("click", toCelsius);

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let place = document.querySelector("h1");
  place.innerHTML = response.data.name;
  let currentWeather = document.querySelector("#temp");
  currentWeather.innerHTML = temp;

  let weatherNow = response.innerHTML.weather[0].description;
  let weather = document.querySelector("#weatherNow");
  weather.innerHTML = weatherNow;

  let rain = Math.round(response.data.weather[0].rain);
  let rainPercent = document.querySelector("#rain");
  rainPercent.innerHTML = rain;

  let humidity = Math.round(response.data.main.humidity);
  let humidityChance = document.querySelector("#humid");
  humidityChance.innerHTML = humidity;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = wind;
}

function searchPlace(event) {
  event.preventDefault();
  let intell = document.querySelector(".intell");
  let apiKey = "b71197f7e8d82097629d6471bab5e796";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${intell.value}&appid=${apiKey}`;

  axios.get(url).then(showTemperature);
}

function searchPlace(city) {
  let apiKey = "b71197f7e8d82097629d6471bab5e796";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showTemperature);
}

function displayCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b71197f7e8d82097629d6471bab5e796";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayCurrentLocation);
}

let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", getCurrentLocation);
