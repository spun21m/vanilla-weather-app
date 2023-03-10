function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${currentDate.getHours()}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${currentDate.getMinutes()}`;
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
  let day = days[currentDate.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayWeatherDetail(response) {
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let date = document.querySelector("#date");
  let humidityPercentage = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let description = document.querySelector("#weather-description");
  let weatherIcon = document.querySelector("#icon");

  city.innerHTML = response.data.name;
  celciusTemp = Math.round(response.data.main.temp);
  temperature.innerHTML = celciusTemp;
  date.innerHTML = formatDate(response.data.dt * 1000);
  humidityPercentage.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = `<em>${response.data.weather[0].description}</em>`;
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "b0ab2a5a92585c3b0f486dbd9d819d01";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherDetail);
}

function submitForm(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#search-city").value;
  search(inputCity);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemp);
  event.target.classList.add("active-temperature");
  celciusIconLink.classList.remove("active-temperature");
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(celciusTemp);
  event.target.classList.add("active-temperature");
  fahrenheitIconLink.classList.remove("active-temperature");
}

let celciusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitForm);

let fahrenheitIconLink = document.querySelector("#fahrenheit-degree");
fahrenheitIconLink.addEventListener("click", displayFahrenheitTemperature);

let celciusIconLink = document.querySelector("#celcius-degree");
celciusIconLink.addEventListener("click", displayCelciusTemperature);

search("new York");
