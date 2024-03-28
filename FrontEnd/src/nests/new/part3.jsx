import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  VStack,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import MapMover from "./mapMover";

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

const Part3 = ({ formdata, setFormdata, onNext, onPrev }) => {
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

  const InputGroup = ({ label, children, height }) => {
    return (
      <FormControl>
        <Flex justifyContent="flex-start">
          <FormLabel
            htmlFor="name"
            w="100px"
            textAlign="end"
            alignContent="center"
            h={height || "40px"}
          >
            {label}
          </FormLabel>
          {children}
        </Flex>
      </FormControl>
    );
  };

  return (
    <>
      <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg">
        <form>
          <VStack spacing={4}>
            <InputGroup label="Location" height="114px">
              <VStack border="1px solid" borderColor="inherit" p={2}>
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
                <Center w="100%">
                  <Button ml={2} onClick={locateUser}>
                    Use Current <br /> Location
                  </Button>
                  <Button ml={2} onClick={handleOpenModal}>
                    Pick Location <br />
                    from Map
                  </Button>
                </Center>
              </VStack>
            </InputGroup>
            <HStack w="100%">
              <Button type="submit" colorScheme="blue" w="50%" onClick={onPrev}>
                Prev
              </Button>
              <Button type="submit" colorScheme="blue" w="50%" onClick={onNext}>
                Submit
              </Button>
            </HStack>
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

export default Part3;
