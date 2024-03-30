import {
  Box,
  Text,
  Heading,
  Badge,
  Divider,
  Grid,
  GridItem,
  Center,
  HStack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FaBed, FaBath, FaMapMarkerAlt } from "react-icons/fa";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { GiHouse } from "react-icons/gi";
import { Carousel } from "./carousel";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import bg from "../assets/nest-bg.jpg";
import { getNestById } from "../api";

const Nest = () => {
  const { id } = useParams();

  const [nest, setNest] = useState(
    JSON.parse(localStorage.getItem("nests")).filter(
      (nest) => nest.id === id
    )[0] || []
  );
  async function getNest() {
    try {
      const response = await getNestById(id);
      const data = response.data.nests;
      setNest(data);
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
    getNest();
  }, []);

  const [bookmarked, setBookmarked] = useState(false);
  const toast = useToast();

  return (
    <Center
      w="100vw"
      h="100vh"
      backgroundImage={bg}
      bgSize={"cover"}
      bgPos={"left"}
    >
      <div
        style={{
          position: "fixed",
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(8px)",
        }}
      />
      <HStack spacing={4}>
        <Carousel />
        <Box
          pos="relative"
          w={"50%"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="4"
          boxShadow="lg"
          bg="white"
          color="gray.700"
          ml={10}
        >
          <IconButton
            icon={bookmarked ? <IoBookmark /> : <IoBookmarkOutline />}
            aria-label="Bookmark"
            size="lg"
            colorScheme="gray"
            position="absolute"
            top="4"
            right="4"
            onClick={() => {
              toast({
                title: bookmarked ? "Removed bookmark" : "Added bookmark",
                description: nest.title,
                status: bookmarked ? "warning" : "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
              });
              setBookmarked(!bookmarked);
            }}
          />
          <Heading size="lg" mb="4">
            {nest.name || "Untitiled"}
          </Heading>
          <Text fontSize="md" mb="2" color="gray.600">
            {nest.description || "No description"}
          </Text>
          <Divider my="4" />
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <HStack>
                <FaMapMarkerAlt /> <Text ml="2">{nest.address}</Text>
              </HStack>
            </GridItem>
            <GridItem>
              <HStack>
                <GiHouse /> <Text ml="2">{nest.area} sqft</Text>
              </HStack>
            </GridItem>
            <GridItem>
              <HStack>
                <FaBed /> <Text ml="2">{nest.bedroom} Bedrooms</Text>
              </HStack>
            </GridItem>
            <GridItem>
              <HStack>
                <FaBath /> <Text ml="2">{nest.bathroom} Bathrooms</Text>
              </HStack>
            </GridItem>
            <GridItem>
              <Badge colorScheme={"green"}>{"Family Friendly"}</Badge>
            </GridItem>
            <GridItem>
              <Badge ml="2" colorScheme={nest.bachelor ? "green" : "red"}>
                {nest.bachelor ? "Bachelor Allowed" : "No Bachelor Allowed"}
              </Badge>
            </GridItem>
            {/* Last 4 GridItems in a 2x2 grid */}
            <GridItem colSpan={2}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <Divider my="4" />
                  <Heading size="sm">Amenities</Heading>
                  <Text>{nest.furnished ? "Furnished" : "Not Furnished"}</Text>
                  <Text>{nest.ac ? "AC" : "No AC"}</Text>
                  <Text>{nest.heater ? "Heater" : "No Heater"}</Text>
                  <Text>{nest.lift ? "Lift" : "No Lift"}</Text>
                </GridItem>
                <GridItem>
                  <Divider my="4" />
                  <Heading size="sm">Utilities</Heading>
                  <Text>Gas: {nest.gas}</Text>
                  <Text>
                    Electricity:{" "}
                    {nest.electricity ? "Available" : "Unavailable"}
                  </Text>
                  <Text>Water: {nest.water ? "Available" : "Unavailable"}</Text>
                </GridItem>
              </Grid>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <Divider my="4" />
                  <Heading size="sm">Lease Terms</Heading>
                  <Text>Rent: {nest.rent} tk </Text>
                  <Text>Service Charge: {nest.serviceCharge} tk </Text>
                  <Text>Security Deposit: {nest.securityDeposit} tk </Text>
                </GridItem>
                <GridItem>
                  <Divider my="4" />
                  <Heading size="sm">Pets</Heading>
                  <Text>
                    Dogs: {nest.dog === "allowed" ? "Allowed" : "Not Allowed"}
                  </Text>
                  <Text>
                    Cats: {nest.cat === "allowed" ? "Allowed" : "Not Allowed"}
                  </Text>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </Box>
      </HStack>
    </Center>
  );
};

export default Nest;
