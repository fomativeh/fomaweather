import { toast } from "react-hot-toast";

export const fetchWeatherData = async (location) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
    );
    if (response.ok) {
      const data = await response.json();
    
      const findResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/find?lat=${data.coord.lat}&lon=${data.coord.lon}&cnt=10&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
      );
      if (findResponse.ok) {
        const placesData = await findResponse.json();
        return { success: true, data, places: placesData.list };
      } else {
        toast.error("Error fetching places data.", { duration: 2800 });
        return { success: false };
      }
    } else {
      toast.error("That location doesn't exist.", { duration: 2000 });
      return { success: false };
    }
  } catch (error) {
    toast.error("Error fetching weather data.", { duration: 2800 });
    return { success: false };
  }
};
