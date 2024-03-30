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
import { useFilterStore } from "../store/nest";
import FloatingIcon from "../user/float";
import { useToast, Button, Box } from "@chakra-ui/react";
import FloatingNests from "../nests/floatingNests";
import MapController from "./controller";
import { IoMdLocate } from "react-icons/io";
import SearchBox from "./searchBox";

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
  const getAll = useFilterStore((state) => state.getAll);
  const applyFilter = (rawNests) => {
    const filters = getAll();
    const filteredNest = rawNests.filter((nest) =>
      Object.keys(filters).reduce((acc, key) => {
        if (!acc) return false;
        if (typeof filters[key] === "boolean" && filters[key] === true)
          acc &= nest[key.toLowerCase()] === true;
        else if (typeof filters[key] !== "boolean") {
          const [l, r] = filters[key];
          const x = nest[key.toLowerCase()];
          acc &= x >= l && x <= r;
        }
        return acc;
      }, true)
    );
    return filteredNest;
    // return nests;
  };
  const [nests, setNests] = useState(
    applyFilter(JSON.parse(localStorage.getItem("nests"))) || []
  );
  const toast = useToast();

  async function getNests() {
    try {
      const response = await getAllNests();
      const data = response.data.nests;
      setNests(applyFilter(data));
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
    const unsubscribeFilter = useFilterStore.subscribe(
      ({ values }) => {
        setNests(applyFilter(nests, values));
      },
      (state) => state.values
    );
    return () => {
      unsubscribeFilter();
    };
  }, []);

  const position = [23.784371669488138, 90.39784565568004];
  const [centerPosition, setCenter] = useState(position);

  const locateUser = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter([position.coords.latitude, position.coords.longitude]);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

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
      <Box pos="absolute" top={4} right={200} zIndex="999">
        <SearchBox flyTo={(pos) => setCenter(pos)} emne={"emne"} />
      </Box>
      <Button
        pos="absolute"
        bottom="100px"
        right={0}
        zIndex="999"
        onClick={locateUser}
        borderRightRadius="100px"
        overflow="hidden"
      >
        <IoMdLocate size={30} />
      </Button>
    </>
  );
};

export default Map;
