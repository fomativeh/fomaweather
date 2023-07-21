export const getWeatherIconClass = (weatherCode) => {
  switch (weatherCode) {
    case "01d":
      return "fas fa-sun"; // Clear Sky - Day
    case "01n":
      return "fas fa-moon"; // Clear Sky - Night
    case "02d":
      return "fas fa-cloud-sun"; // Few Clouds - Day
    case "02n":
      return "fas fa-cloud-moon"; // Few Clouds - Night
    case "03d":
    case "03n":
      return "fas fa-cloud"; // Scattered Clouds
    case "04d":
    case "04n":
      return "fas fa-cloud"; // Broken Clouds
    case "09d":
    case "09n":
      return "fas fa-cloud-showers-heavy"; // Shower Rain
    case "10d":
      return "fas fa-cloud-rain"; // Rain - Day
    case "10n":
      return "fas fa-cloud-rain"; // Rain - Night
    case "11d":
    case "11n":
      return "fas fa-bolt"; // Thunderstorm
    case "13d":
    case "13n":
      return "fas fa-snowflake"; // Snow
    case "50d":
    case "50n":
      return "fas fa-smog"; // Mist/Fog
    default:
      return "fas fa-question"; // Default icon for unknown weather codes
  }
};
