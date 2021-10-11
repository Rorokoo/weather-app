function showTemp(response) {
  let temp = document.querySelector("#currentTemp");
  let city = document.querySelector(".city");
  city.innerHTML = response.data.name;
  temp.innerHTML = Math.round(response.data.main.temp);
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

function displayDate() {
  let now = new Date();

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

  let hour = now.getHours();

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${now.getMinutes()}`;
  }
  let day = days[now.getDay()];

  let currentTime = `${day} ${hour}:${minutes}`;
  let time = document.querySelector("#time");
  time.innerHTML = currentTime;

  let month = months[now.getMonth()];

  let date = now.getDate();

  let year = now.getFullYear();

  let fullDate = `${month} ${date}, ${year} `;
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

let date = displayDate();

searchCity("Tel Aviv");

let search = document.querySelector("#form");

search.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", myLocation);
