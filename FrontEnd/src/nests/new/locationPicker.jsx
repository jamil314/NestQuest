import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Text,
} from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import MapMover from "./mapMover";
import { useState } from "react";

const MapModal = ({ isOpen, onClose, setLocation }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleMapClick = (e) => {
    setSelectedPosition(e.latlng);
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };
  const locateUser = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setSelectedPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = () => {
    if (selectedPosition) {
      setLocation(selectedPosition.lat, selectedPosition.lng);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Pick Location from Map</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler />
            {selectedPosition && <Marker position={selectedPosition} />}
            <MapMover location={selectedPosition} />
          </MapContainer>
        </ModalBody>

        <ModalFooter>
          <Button onClick={locateUser} w="100%">
            Locate Me
          </Button>
          <Button colorScheme="blue" mr={3} ml={3} onClick={handleSubmit}>
            Confirm
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const LocationPicker = ({ formdata, setFormdata }) => {
  const [isOpen, setIsOpen] = useState(false);

  const setLocation = (lat, long) => {
    setFormdata((prevData) => ({
      ...prevData,
      lat: lat,
      long: long,
    }));
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const locateUser = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(position.coords.latitude, position.coords.longitude);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <>
      <Box maxW="md" mx="auto">
        <form>
          <VStack spacing={4} mb={4}>
            <VStack p={2}>
              <Text
                paddingLeft={8}
                paddingRight={8}
                marginBottom={4}
                fontSize="larger"
                borderBottom="1px solid"
                borderColor="inherit"
              >
                {" "}
                Location
              </Text>
              <Center justifyContent="space-between">
                <FormControl marginRight="8px">
                  <Flex justifyContent="flex-start">
                    <FormLabel
                      htmlFor="lat"
                      textAlign="end"
                      alignContent="center"
                      h="40px"
                    >
                      Lat
                    </FormLabel>
                    <Input
                      id="lat"
                      name="lat"
                      type="number"
                      defaultValue={formdata.lat}
                      placeholder="Lat"
                    />
                  </Flex>
                </FormControl>

                <FormControl>
                  <Flex justifyContent="flex-start">
                    <FormLabel
                      htmlFor="long"
                      textAlign="end"
                      alignContent="center"
                      h="40px"
                    >
                      Long
                    </FormLabel>
                    <Input
                      id="long"
                      name="long"
                      type="number"
                      defaultValue={formdata.long}
                      placeholder="Long"
                    />
                  </Flex>
                </FormControl>
              </Center>
              {/* <Center w="100%"> */}
              <Button w="60%" ml={2} onClick={locateUser}>
                Use Current Location
              </Button>
              <Button w="60%" ml={2} onClick={handleOpenModal}>
                Pick Location from Map
              </Button>
              {/* </Center> */}
            </VStack>
          </VStack>
        </form>
      </Box>
      <MapModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        setLocation={setLocation}
      />
    </>
  );
};

export default LocationPicker;
