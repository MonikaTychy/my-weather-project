//current time

let currentTime = document.querySelector("#time");
let currentDate = document.querySelector("#date");
let now = new Date();
let days = [
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10){
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10){
  minutes = `0${minutes}`;
}
let date = now.getDate();
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
  "December"
];

let month = months[now.getMonth()];
let year = now.getFullYear();

currentTime.innerHTML = `${day} ${hours}:${minutes}`; 
currentDate.innerHTML = `${date} ${month} ${year}`;

//search-engine 

function showWeatherDetails (response){
document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
document.querySelector ("#pressure").innerHTML = response.data.main.pressure;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#city").innerHTML = response.data.name;
}

function search (city){
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "49d519d3a707f25a178a456019ddf9de";
  let units = "metric";
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(showWeatherDetails);
}

function handleSubmit (event){
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function showPosition (position){
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "49d519d3a707f25a178a456019ddf9de";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeatherDetails);
}

function getCurrentLocation (event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}


let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchEngine = document.querySelector("form");
searchEngine.addEventListener("submit", handleSubmit);
search("Gdynia");