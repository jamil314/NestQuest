import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import houseMarker from "../assets/marker2.png";
import { mockNests } from "../api/mockApi";
import NestCard from "../nests/nestCard";
import { useEffect, useState } from "react";
import { getAllNests } from "../api";
// import { FaBed } from "react-icons/fa";

const customIcon = L.icon({
  iconUrl: houseMarker,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Map = () => {
  const [nests, setNests] = useState([]);

  async function getNests() {
    const response = await getAllNests();
    const data = response.data.nests;
    console.log(data);
    setNests(data);
  }

  useEffect(() => {
    getNests();
  }, []);

  const position = [23.784371669488138, 90.39784565568004];
  return (
    <MapContainer
      center={position}
      zoom={20}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {nests.map((nest) => {
        return (
          <Marker
            position={[nest.lat, nest.long]}
            icon={customIcon}
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
    </MapContainer>
  );
};

export default Map;
