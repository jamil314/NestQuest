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
import { mockNests } from "../api/mockApi";
import { Carousel } from "./carousel";
import { useState } from "react";

import bg from "../assets/nest-bg.jpg";

const Nest = ({ id }) => {
  const house = mockNests[0];
  const {
    title,
    description,
    location,
    layout,
    amenities,
    utilities,
    pets,
    leaseTerms,
    tenantRestrictions,
  } = house;

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
          w={"50%"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="4"
          boxShadow="lg"
          bg="white"
          color="gray.700"
          position="relative"
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
                description: house.title,
                status: bookmarked ? "warning" : "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
              });
              setBookmarked(!bookmarked);
            }}
          />
          <Heading size="lg" mb="4">
            {title}
          </Heading>
          <Text fontSize="md" mb="2" color="gray.600">
            {description}
          </Text>
          <Divider my="4" />
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <HStack>
                <FaMapMarkerAlt /> <Text ml="2">{location.address}</Text>
              </HStack>
            </GridItem>
            <GridItem>
              <HStack>
                <GiHouse /> <Text ml="2">{layout.area} sqft</Text>
              </HStack>
            </GridItem>
            <GridItem>
              <HStack>
                <FaBed /> <Text ml="2">{layout.bed} Bedrooms</Text>
              </HStack>
            </GridItem>
            <GridItem>
              <HStack>
                <FaBath /> <Text ml="2">{layout.bath} Bathrooms</Text>
              </HStack>
            </GridItem>
            <GridItem colSpan={2}>
              <Badge
                colorScheme={
                  tenantRestrictions.family === "allowed" ? "green" : "red"
                }
              >
                {tenantRestrictions.family === "allowed"
                  ? "Family Friendly"
                  : "No Family Allowed"}
              </Badge>
              <Badge
                ml="2"
                colorScheme={
                  tenantRestrictions.bachelor === "allowed" ? "green" : "red"
                }
              >
                {tenantRestrictions.bachelor === "allowed"
                  ? "Bachelor Allowed"
                  : "No Bachelor Allowed"}
              </Badge>
            </GridItem>
            <GridItem colSpan={2}>
              <Divider my="4" />
              <Heading size="sm">Amenities</Heading>
              <Text>{amenities.furnished ? "Furnished" : "Not Furnished"}</Text>
              <Text>{amenities.ac ? "AC" : "No AC"}</Text>
              <Text>{amenities.heater ? "Heater" : "No Heater"}</Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Divider my="4" />
              <Heading size="sm">Utilities</Heading>
              <Text>Gas: {utilities.gas}</Text>
              <Text>Electricity: {utilities.electricity}</Text>
              <Text>Water: {utilities.water}</Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Divider my="4" />
              <Heading size="sm">Pets</Heading>
              <Text>
                Dogs: {pets.dog === "allowed" ? "Allowed" : "Not Allowed"}
              </Text>
              <Text>
                Cats: {pets.cat === "allowed" ? "Allowed" : "Not Allowed"}
              </Text>
              <Text>
                Rats: {pets.rats === "allowed" ? "Allowed" : "Not Allowed"}
              </Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Divider my="4" />
              <Heading size="sm">Lease Terms</Heading>
              <Text>
                Rent: ${leaseTerms.rent.amount} (Duration:{" "}
                {leaseTerms.rent.duration})
              </Text>
              <Text>Advance: {leaseTerms.advance}</Text>
              <Text>Notice: {leaseTerms.notice}</Text>
            </GridItem>
          </Grid>
        </Box>
      </HStack>
    </Center>
  );
};

export default Nest;
