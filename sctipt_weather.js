

const API_KEY = 'bf683f6819f165ad926cb85269e16dfc';

async function fetchWeather() {
  const city = document.getElementById("search").value;
  if (!city) {
    alert("London");
    return;
  }

  const coordinates = await getCoordinates(city);
  if (!coordinates) {
    alert("City is unfound");
    return;
  }

  const weather = await getWeatherData(coordinates.lat, coordinates.lon);
  if (weather) {
    displayWeather(city, weather);
  }
}

async function getCoordinates(city) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data[0];
}

async function getWeatherData(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=eng`;
  const response = await fetch(url);
  return await response.json();
}

function displayWeather(city, data) {
  const weatherDiv = document.getElementById("weather-data");
  weatherDiv.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
    <h2>${city}</h2>
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Weather: ${data.weather[0].description}</p>
  `;
}
