function showTemp(response) {
  let temp = document.querySelector("#currentTemp");
  let city = document.querySelector(".city");
  city.innerHTML = response.data.name;
  celsius = response.data.main.temp;
  temp.innerHTML = Math.round(celsius);

  let emoji = document.querySelector(".currentEmoji");
  emoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  emoji.setAttribute("alt", response.data.weather[0].description);
  displayDate(response.data.dt * 1000);
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  let fahrenheit = (celsius * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheit);
}

function changeToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(celsius);
}

function searchCity(city) {
  let key = "f5029b784306910c19746e40c14d6cd3";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  let displayedCity = document.querySelector(".city");
  displayedCity.innerHTML = city;
  axios.get(url).then(showTemp);
}

function handleSubmit(event) {
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
  axios.get(url).then(showTemp);
}

function myLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let celsius = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
let celsiusLink = document.querySelector("#celsius");

fahrenheitLink.addEventListener("click", changeToFahrenheit);
celsiusLink.addEventListener("click", changeToCelsius);

searchCity("Tel Aviv");

let search = document.querySelector("#form");

search.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", myLocation);
