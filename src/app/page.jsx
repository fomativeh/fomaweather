"use client";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useEffect, useState } from "react";
import { firstLetterUpper } from "../../utils/FirstLetterUpper";
import { fetchWeatherImage } from "./apis/fetchImage";
import { fetchWeatherData } from "./apis/fetchWeatherData";
import Loader3 from "./components/Loaders/Loader3/Loader3";
import Loader2 from "./components/Loaders/Loader2/Loader2";
import Loader1 from "./components/Loaders/Loader1/Loader1";
import LocationIQMap from "./components/Map/Map";
import { getWeatherIconClass } from "../../utils/getWeatherIcons";
import { fetchRelatedRegions } from "./apis/fetchRelatedRegions";
import LoadingModal from "./components/Loaders/LoadingModal/LoadingModal";
import "./Styles.scss"
export default function Home() {
  const [location, setLocation] = useState("");
  const [locationToFind, setLocationToFind] = useState("");
  const [weatherDescription, setWeatherDescription] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [relatedPlaces, setRelatedPlaces] = useState(null);
  const [relatedPlacesData, setRelatedPlacesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherImage, setWeatherImage] = useState(
    "https://icon-library.com/images/weather-icon-sunny/weather-icon-sunny-12.jpg"
  );
useEffect(() => {
  // Disable scrolling when isLoading is true
  if (isLoading) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  // Clean up the event listener when the component unmounts
  return () => {
    document.body.style.overflow = "auto";
  };
}, [isLoading]);

  const handleCardClick = () => {
    // Scroll to the top of the page when a card is clicked
    window.scrollTo(0, 0);
  };

  const initApp = () => {
    const storedLocation = localStorage.getItem("storedLocation");
    if (
      storedLocation == null ||
      storedLocation == undefined ||
      storedLocation.trim() === ""
    ) {
      setLocation("America");
      setLocationToFind("America");
    } else {
      setLocation(storedLocation);
      setLocationToFind(storedLocation);
    }
  };

  useEffect(() => {
    initApp();
  }, []);

  useEffect(() => {
    if (weatherDescription) {
      handleFetchWeatherImage();
    }
  }, [weatherDescription]);

  useEffect(() => {
    if (location) {
      handleFetchWeatherData();
    }
  }, [locationToFind]);

  useEffect(() => {
    if (weatherData && relatedPlaces) {
      handleFetchRelatedRegions();
    }
  }, [weatherData, relatedPlaces]);

  useEffect(() => {
    localStorage.setItem("storedLocation", location);
  }, [location]);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleFetchWeatherData = async () => {
    setIsLoading(true);
    const weatherDataRes = await fetchWeatherData(locationToFind);
    if (weatherDataRes.success) {
      setWeatherData(weatherDataRes.data);
      setWeatherDescription(weatherDataRes?.data?.weather[0]?.description);
      if (weatherDescription) {
        handleFetchWeatherImage();
      }
      setRelatedPlaces(weatherDataRes.places); // Store related places data for later use
    }
    setIsLoading(false);
  };

  const handleFetchWeatherImage = async () => {
    setIsLoading(true);
    const imageUrl = await fetchWeatherImage(weatherDescription);
    if (imageUrl !== null) {
      setWeatherImage(imageUrl);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location?.trim() === "") {
      return toast.error("Location is required.", { duration: 2800 });
    }
    setLocationToFind(location);
    handleFetchWeatherData();
  };

  const handleFetchRelatedRegions = async () => {
    setIsLoading(true);
    if (relatedPlaces) {
      // To filter out duplicates
      const placesSet = new Set();
      const uniqueRelatedPlaces = relatedPlaces
        .filter((place) => {
          if (place.name !== location && !placesSet.has(place.name)) {
            placesSet.add(place.name);
            return true;
          }
          return false;
        })
        .map((place) => place.name);
      const fetchRelatedRegionsRes = await fetchRelatedRegions(
        uniqueRelatedPlaces
      );
      if (fetchRelatedRegionsRes.success) {
        setRelatedPlacesData(fetchRelatedRegionsRes.data);
      }
    }
    setIsLoading(false);
  };

  const handleRelatedRegionClick = async (region) => {
    setLocation(region);
    setLocationToFind(region);
  };

  const RelatedPlaces = ({ place }) => {
    return (
      <section
        onClick={() => {
          handleRelatedRegionClick(place.data.name);
          handleCardClick();
        }}
        className="place-card w-full bg-lighterBg hover:bg-zinc-800 cursor-pointer h-17 mb-4 rounded-xl flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center p-3 pl-6 md:p-4"
      >
        <section className="top flex items-center">
          <section className="icon h-full w-[50px]">
            <i
              className={`${getWeatherIconClass(
                place.data.weather[0].icon
              )} text-[35px]`}
            ></i>
          </section>

          <section className="flex ml-2 md:ml-4 flex-col justify-start items-start">
            <h2 className="mb-1 md:mb-2 text-xl font-bold">
              {place.data.name}
            </h2>
            <p className="text-sm text-[silver]">
              {firstLetterUpper(place.data.weather[0].description)}
            </p>
          </section>
        </section>
        <span className="temp mt-2 md:mt-0 text-2xl">
          {place.data.main.temp}&deg;c
        </span>
      </section>
    );
  };

  return (
    <main className="w-full main-section max-w-[2000px] flex justify-between items-start bg-darkBg p-5 relative">
      {isLoading && <LoadingModal />}
      <section className="w-full left-section md:w-3/5 bg-lighterBg rounded-xl p-4 flex flex-col justify-start items-start">
        <form className="w-full" onSubmit={handleSubmit}>
          <input
            value={location}
            onChange={handleInputChange}
            type="text"
            className="w-full h-14 rounded-xl p-3 mb-[30px] bg-darkBg text-white text-xl outline-none pl-4 placeholder:text-white placeholder:text-sm"
            placeholder="Enter a location..."
          />
        </form>
        <section className="rw flex justify-start items-center w-full pl-[30px] pr-[30px]">
          <section className="w-data w-full md:w-2/3 h-[250px] flex flex-col justify-start items-start">
            <section className="flex flex-col justify-between items-start h-full">
              <section>
                <h1 className="m-0 mb-4 text-[40px]">
                  {weatherData ? weatherData?.name : <Loader2 />}
                </h1>
                <p className="text-[silver]">
                  {weatherDescription ? (
                    firstLetterUpper(weatherDescription)
                  ) : (
                    <Loader1 />
                  )}
                </p>
              </section>
              <span className="text-[40px] font-bold">
                {weatherData == null ? (
                  <Loader3 />
                ) : (
                  `${weatherData?.main?.temp}\u00B0c`
                )}
              </span>
            </section>
          </section>
          <figure className="w-[300px] h-[300px] relative w-img">
            <Image
              alt={"Location weather status image"}
              src={weatherImage}
              fill
              className="rounded-[50%]"
            />
          </figure>
        </section>
        {weatherData && (
          <LocationIQMap
            latitude={weatherData?.coord.lat}
            longitude={weatherData?.coord.lon}
          />
        )}
      </section>
      <section className="w-[35%] right-section h-fit rounded-xl p-5 flex flex-col justify-start items-start">
        <h1 className="text-white m-0 mb-10">Related Regions</h1>
        <section className="flex flex-col w-full places-list">
          {relatedPlacesData
            ?.filter((place) => place.data.name !== location)
            .map((place, i) => {
              return <RelatedPlaces key={i} place={place} />;
            })}
        </section>
      </section>
    </main>
  );
}
