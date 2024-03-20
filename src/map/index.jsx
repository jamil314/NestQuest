import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import houseMarker from '../assets/marker2.png'


const customIcon = L.icon({
    iconUrl: houseMarker,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

const Map = () => {

    const position = [ 23.784371669488138, 90.39784565568004];
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
      <Marker position={position} icon={customIcon} >
        <Popup>
            <div>
                Birdy says hi !! 
            </div>
        </Popup>
        <Tooltip>
            Birdy Lives Here
        </Tooltip>
      </Marker>
    </MapContainer>
  );
};

export default Map;