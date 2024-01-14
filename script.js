const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
const apiKey = '0e60c7da6bf32c866d9488108c9fb027';

const temperature = document.getElementById('temp');
const city = document.getElementById('city');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

const input = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherImg = document.getElementById('weather-img');

const weatherDiv = document.querySelector('.weather');

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    showDataByCity(input.value);
  }
});

searchBtn.addEventListener('click', () => {
  showDataByCity(input.value);
});

const showDataByCity = (cityName) => {
  getWeatherByCity(cityName)
    .then((weatherData) => {
      if (!weatherData) {
        return;
      }

      updateData(weatherData);
      weatherDiv.style.display = 'block';
    })
}

const getWeatherByCity = async (cityName) => {
  try {
    const fullUrl = `${url}&q=${cityName.toLowerCase()}&appid=${apiKey}`;
    const res = await fetch(fullUrl);

    if (!res.ok) {
      throw new Error(`Couldn't get the weather data. Error code: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    alert(`Couldn't get city data.`);
  }
}

const updateData = (tempData) => {
  temperature.innerText = `${tempData.main.temp}°C`;
  city.innerText = tempData.name;
  humidity.innerText = `${tempData.main.humidity}%`;
  wind.innerText = `${tempData.wind.speed} km/h`;
  weatherImg.src = `images/${tempData.weather[0].main.toLowerCase()}.png`;
}

const getWeatherByCoor = async (coords) => {
  try {
    const { latitude, longitude } = coords;
    const fullUrl = `${url}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    const res = await fetch(fullUrl);

    if (!res.ok) {
      throw new Error(`Couldn't get the weather data. Error code: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    alert(`Couldn't get weather data. ${error.message}`);
  }
}

const showDataByCoor = () => {
  const success = async (position) => {
    getWeatherByCoor(position.coords)
      .then((weatherData) => {
        if (!weatherData) {
          return;
        }

        updateData(weatherData);
        weatherDiv.style.display = 'block';
      });
  }

  const error = () => {
    console.log('MAL AHÍ');
  }

  navigator.geolocation.getCurrentPosition(success, error);
}

showDataByCoor();