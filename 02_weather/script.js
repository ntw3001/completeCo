document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const apiKey = ""

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city)
    } catch (error) {
      showError()
    }
  })

  async function fetchWeatherData(city) {

  }

  function displayWeatherData(weatherData) {

  }

  function showError() {
    weatherInfo.classList.add("hidden")
    errorMessage.classList.remove("hidden")
  }
})
