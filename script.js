function showWeather(response) {
  let temp = document.querySelector("#currentTemp");
  let city = document.querySelector(".city");
  let description = document.querySelector("#description");
  let wind = document.querySelector("#wind");
  let emoji = document.querySelector(".currentEmoji");
  let cityCoordinates = response.data.coord;

  description.innerHTML = response.data.weather[0].description;
  wind.innerHTML = `Wind: ${Math.round(
    (response.data.wind.speed * 18) / 5
  )} km/h`;

  city.innerHTML = response.data.name;
  celsius = response.data.main.temp;
  temp.innerHTML = Math.round(celsius);
  celsiusLink.style.color = "#0a58ca";
  fahrenheitLink.style.color = "rgb(198, 190, 190)";

  emoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  emoji.setAttribute("alt", response.data.weather[0].description);
  displayDate(response.data.dt * 1000);

  getForecast(cityCoordinates);
}

function searchCity(city) {
  let key = "f5029b784306910c19746e40c14d6cd3";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(showWeather);
}

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  let fahrenheit = (celsius * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheit);
  celsiusLink.style.color = "rgb(198, 190, 190)";
  fahrenheitLink.style.color = "#0a58ca";

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, i) {
    if (i > 0 && i < 6) {
      let temp = Math.round((forecastDay.temp.day * 9) / 5 + 32);
      forecastHTML =
        forecastHTML +
        `<div class="col text-center">
        <div class="day">${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }.png"> 
        <div class="temp">${temp}??</div>
      </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML + `</div>`;
}

function changeToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(celsius);
  fahrenheitLink.style.color = "rgb(198, 190, 190)";
  celsiusLink.style.color = "#0a58ca";

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, i) {
    if (i > 0 && i < 6) {
      let temp = Math.round(forecastDay.temp.day);
      forecastHTML =
        forecastHTML +
        `<div class="col text-center">
        <div class="day">${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }.png"> 
        <div class="temp">${temp}??</div>
      </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML + `</div>`;
}

function displayForecast(response) {
  console.log(response);
  forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, i) {
    if (i > 0 && i < 6) {
      let temp = Math.round(forecastDay.temp.day);
      forecastHTML =
        forecastHTML +
        `<div class="col text-center">
        <div class="day">${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }.png"> 
        <div class="temp">${temp}??</div>
      </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML + `</div>`;
}

function getForecast(coordinates) {
  let apiKey = "f5029b784306910c19746e40c14d6cd3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  celsiusLink.style.color = "#0a58ca";
  fahrenheitLink.color = "rgb(198, 190, 190)";
  event.preventDefault();
  let city = document.querySelector("#box").value;
  searchCity(city);
}

function displayDate(timeStamp) {
  let update = new Date(timeStamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let hour = update.getHours();

  let minutes = update.getMinutes();
  if (minutes < 10) {
    minutes = `0${update.getMinutes()}`;
  }
  let day = days[update.getDay()];

  let currentTime = `updated at ${hour}:${minutes}`;
  let time = document.querySelector("#time");
  time.innerHTML = currentTime;

  let month = months[update.getMonth()];

  let date = update.getDate();

  let year = update.getFullYear();

  let fullDate = ` ${day}, ${month} ${date}, ${year} `;
  let htmlDate = document.querySelector("#fullDate");
  htmlDate.innerHTML = fullDate;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "f5029b784306910c19746e40c14d6cd3";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(url).then(showWeather);
}

function myLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let celsius = null;
let forecast = null;

searchCity("Tel Aviv");

let fahrenheitLink = document.querySelector("#fahrenheit");
let celsiusLink = document.querySelector("#celsius");

fahrenheitLink.addEventListener("click", changeToFahrenheit);
celsiusLink.addEventListener("click", changeToCelsius);

let search = document.querySelector("#form");

search.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", myLocation);
