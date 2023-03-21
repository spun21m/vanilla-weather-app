// let apiKey = "b0ab2a5a92585c3b0f486dbd9d819d01";
let apiKey = "f3bca34ct89oa34003327040cfb10a10";
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

function getDay(timestamp) {
  let day = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day.getDay()];
}

function displayWeatherForecast(response) {
  let weatherForecast = document.querySelector("#forecast");
  let dailyForecast = response.data.daily;
  let forecastHtml = `<div class="row">`;
  dailyForecast.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
        <div class="col-2">
          <span class="forecast-day">${getDay(day.time)}</span>
          <img
            src="https://openweathermap.org/img/wn/01n@2x.png"
            alt=""
            width="36"
          />
          <span class="forecast-temperature">
            <span class="max-temperature">11°</span>
            <span class="min-temperature">3°</span>
          </span>
        </div>
      `;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  weatherForecast.innerHTML = forecastHtml;
}

function displayForecastByCoord(coordinates) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherForecast);
}

function displayWeatherDetail(response) {
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let date = document.querySelector("#date");
  let humidityPercentage = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let description = document.querySelector("#weather-description");
  let weatherIcon = document.querySelector("#icon");

  city.innerHTML = response.data.city;
  celciusTemp = Math.round(response.data.temperature.current);
  temperature.innerHTML = celciusTemp;
  date.innerHTML = formatDate(response.data.time * 1000);
  humidityPercentage.innerHTML = response.data.temperature.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = `<em>${response.data.condition.description}</em>`;
  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  weatherIcon.setAttribute("alt", response.data.condition.description);

  displayForecastByCoord(response.data.coordinates);
}

function search(city) {
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
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
