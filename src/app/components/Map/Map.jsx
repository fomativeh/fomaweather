import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

const LocationIQMap = ({ latitude, longitude }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const locationiqKey = process.env.NEXT_PUBLIC_LOCATIONIQ_KEY;

    // Check if the map instance is already created
    if (!mapInstanceRef.current) {
      maplibregl.accessToken = locationiqKey;
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        attributionControl: false,
        style:
          "https://tiles.locationiq.com/v3/streets/vector.json?key=" +
          locationiqKey,
        zoom: 12,
        center: [longitude, latitude], // Use the prop coordinates as the initial center
      });

      // Add Navigation controls to the map to the top-right corner of the map
      const nav = new maplibregl.NavigationControl();
      map.addControl(nav, "top-right");

      // Add a 'full screen' button to the map
      map.addControl(new maplibregl.FullscreenControl());

      // Add a Scale to the map
      map.addControl(
        new maplibregl.ScaleControl({
          maxWidth: 80,
          unit: "metric", //imperial for miles
        })
      );

      // Add Geolocation control to the map (will only render when the page is opened over HTTPS)
      map.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );

      mapInstanceRef.current = map;
    } else {
      // If the map instance is already created, update the center when the coordinates change
      mapInstanceRef.current.setCenter([longitude, latitude]);
    }
  }, [latitude, longitude]);

  return (
    <section
      ref={mapContainerRef}
      className="w-full mt-[40px] h-[35vh] max-h-[400px] min-h-[300px] rounded-2xl"
    ></section>
  );
};

export default LocationIQMap;
