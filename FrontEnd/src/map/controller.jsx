import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapController = (location) => {
  const map = useMap();
  const flyToDuration = 1.5;
  const flyTo = (location) => {
    map.flyTo(location, 18, {
      animate: true,
      duration: flyToDuration,
    });
  };
  useEffect(() => {
    flyTo(location.position);
  }, [location]);

  return null;
};

export default MapController;
