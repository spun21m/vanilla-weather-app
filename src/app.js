let apiKey = "b0ab2a5a92585c3b0f486dbd9d819d01";
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
  console.log(response);
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let date = document.querySelector("#date");
  let humidityPercentage = document.querySelector("#humidity");

  city.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
  date.innerHTML = formatDate(response.data.dt * 1000);
  humidityPercentage.innerHTML = response.data.main.humidity;
}

let city = "New York";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayWeatherDetail);
