import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import houseMarker from "../assets/marker2.png";
import { mockNests } from "../api/mockApi";
import NestCard from "../nests/nestCard";
// import { FaBed } from "react-icons/fa";

const customIcon = L.icon({
  iconUrl: houseMarker,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Map = () => {
  const nests = mockNests;

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
            position={[nest.location.lat, nest.location.long]}
            icon={customIcon}
            key={nest.id}
          >
            <Popup>
              <NestCard {...nest} />
            </Popup>
            <Tooltip>
              <div>bed: {nest.layout.bed}</div>
              <div>rent: {nest.leaseTerms.rent.amount}</div>
            </Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
