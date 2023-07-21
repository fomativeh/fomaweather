import { toast } from "react-hot-toast";

export const fetchRelatedRegions = async (locations) => {
  if (locations.length === 0) {
    return { success: false, message: "No locations provided." };
  }

  try {
    const requests = locations.map((location) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
      )
    );

    const responses = await Promise.all(requests);

    const weatherDataArray = await Promise.all(
      responses.map(async (response) => {
        if (response.ok) {
          const data = await response.json();
          return { data };
        } else {
          // Ignore the failed request and return null.
          return null;
        }
      })
    );

    const successfulWeatherData = weatherDataArray.filter(
      (weatherData) => weatherData !== null
    );

    return { success: true, data: successfulWeatherData };
  } catch (error) {
    toast.error("Error fetching related locations.", { duration: 2800 });
    return { success: false };
  }
};
