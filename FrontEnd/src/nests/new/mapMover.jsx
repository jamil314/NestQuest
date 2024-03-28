import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapMover = ({ location }) => {
  const map = useMap();
  const flyToDuration = 1.5;
  const flyTo = (location) => {
    map.flyTo(location, 18, {
      animate: true,
      duration: flyToDuration,
    });
  };
  useEffect(() => {
    if (location) {
      const { lat, lng } = location;
      flyTo([lat, lng]);
    }
  }, [location]);

  return null;
};

export default MapMover;
