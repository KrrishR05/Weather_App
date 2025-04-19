const apiKey = "a073c6733667bac49746ea0b485c3483";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const cityName = document.getElementById("cityName");
const weatherEmoji = document.getElementById("weatherEmoji");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherCharacter = document.getElementById("weatherCharacter");
const themeToggle = document.getElementById("themeToggle");
const mascot = document.getElementById("mascot");

// Weather emoji based on condition
const getEmoji = (main) => {
  switch (main) {
    case "Clear": return "☀️";
    case "Clouds": return "☁️";
    case "Rain": return "🌧️";
    case "Drizzle": return "🌦️";
    case "Thunderstorm": return "⛈️";
    case "Snow": return "❄️";
    case "Mist":
    case "Fog": return "🌫️";
    default: return "🌈";
  }
};

// Animated weather character
const getWeatherCharacter = (main) => {
  switch (main) {
    case "Clear":
      weatherCharacter.textContent = "😎";
      weatherCharacter.style.animation = "sunnyMove 2s infinite";
      break;
    case "Clouds":
      weatherCharacter.textContent = "🌥️";
      weatherCharacter.style.animation = "moveClouds 5s ease-in-out infinite";
      break;
    case "Rain":
      weatherCharacter.textContent = "☔";
      weatherCharacter.style.animation = "moveRaindrops 1s ease-in-out infinite";
      break;
    case "Snow":
      weatherCharacter.textContent = "⛄";
      weatherCharacter.style.animation = "moveSnow 2s ease-in-out infinite";
      break;
    case "Thunderstorm":
      weatherCharacter.textContent = "⚡";
      weatherCharacter.style.animation = "shakeStorm 1s infinite";
      break;
    default:
      weatherCharacter.textContent = "🌈";
      weatherCharacter.style.animation = "none";
      break;
  }
};

// Mascot emoji updates
const getMascot = (main) => {
  switch (main) {
    case "Clear":
      mascot.textContent = "😎";
      break;
    case "Clouds":
      mascot.textContent = "🌥️";
      break;
    case "Rain":
      mascot.textContent = "☔";
      break;
    case "Snow":
      mascot.textContent = "⛄";
      break;
    case "Thunderstorm":
      mascot.textContent = "😲⚡";
      break;
    case "Mist":
    case "Fog":
      mascot.textContent = "😶‍🌫️";
      break;
    default:
      mascot.textContent = "🌈";
      break;
  }
};

// Dynamic background based on weather
const setDynamicBackground = (condition) => {
  let bg = "";
  switch (condition) {
    case "Clear":
      bg = "linear-gradient(to top, #fceabb, #f8b500)";
      break;
    case "Clouds":
      bg = "linear-gradient(to top, #d7d2cc, #304352)";
      break;
    case "Rain":
      bg = "linear-gradient(to top, #000046, #1CB5E0)";
      break;
    case "Snow":
      bg = "linear-gradient(to top, #e6dada, #274046)";
      break;
    case "Thunderstorm":
      bg = "linear-gradient(to top, #373B44, #4286f4)";
      break;
    case "Drizzle":
      bg = "linear-gradient(to top, #3a7bd5, #3a6073)";
      break;
    case "Mist":
    case "Fog":
      bg = "linear-gradient(to top, #606c88, #3f4c6b)";
      break;
    default:
      bg = "linear-gradient(to top, #83a4d4, #b6fbff)";
      break;
  }
  document.body.style.background = bg;
};

// Fetch weather and display
const getWeather = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found!");
      return;
    }

    console.log("API Response ✅:", data);

    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind Speed: ${data.wind.speed} km/h`;
    weatherEmoji.textContent = getEmoji(data.weather[0].main);

    getWeatherCharacter(data.weather[0].main);
    getMascot(data.weather[0].main); // ✅ Important fix here!
    setDynamicBackground(data.weather[0].main);

    document.querySelector(".weather-info").classList.add("fade-in");

  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("Something went wrong. Try again later.");
  }
};

// Button to fetch weather
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name!");
  }
});

// Dark/Light Mode Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});


const dateTime = document.getElementById("dateTime");
setInterval(() => {
  const now = new Date();
  dateTime.textContent = now.toLocaleString();
}, 1000);
