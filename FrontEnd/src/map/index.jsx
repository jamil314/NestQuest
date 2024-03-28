import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import houseMarker from "../assets/marker2.png";
import houseMarker2 from "../assets/marker3.png";
import NestCard from "../nests/nestCard";
import { getAllNests } from "../api";
import FloatingIcon from "../user/float";
import { useToast } from "@chakra-ui/react";
import FloatingNests from "../nests/floatingNests";
import MapController from "./controller";

const customIcon = L.icon({
  iconUrl: houseMarker,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const customIconSelected = L.icon({
  iconUrl: houseMarker2,
  iconSize: [44, 44],
  iconAnchor: [22, 44],
  popupAnchor: [0, -44],
});

const Map = () => {
  const [nests, setNests] = useState(
    JSON.parse(localStorage.getItem("nests")) || []
  );
  const toast = useToast();

  async function getNests() {
    try {
      const response = await getAllNests();
      const data = response.data.nests;
      setNests(data);
      localStorage.setItem("nests", JSON.stringify(data));
    } catch (error) {
      toast({
        title: "Network Error!!",
        description: "Please check your connection and refresh",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  useEffect(() => {
    getNests();
  }, []);

  const position = [23.784371669488138, 90.39784565568004];
  const [centerPosition, setCenter] = useState(position);
  return (
    <>
      <MapContainer
        center={position}
        zoom={20}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        {nests.map((nest) => {
          return (
            <Marker
              position={[nest.lat, nest.long]}
              icon={
                nest.lat == centerPosition[0] && nest.long == centerPosition[1]
                  ? customIconSelected
                  : customIcon
              }
              key={nest.id}
            >
              <Popup>
                <NestCard {...nest} />
              </Popup>
              <Tooltip>
                <div>bed: {nest.bedroom}</div>
                <div>rent: {nest.rent}</div>
              </Tooltip>
            </Marker>
          );
        })}

        <MapController position={centerPosition} />
      </MapContainer>
      <FloatingNests nests={nests} flyTo={(pos) => setCenter(pos)} />
      <FloatingIcon />
    </>
  );
};

export default Map;
