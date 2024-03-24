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
} from "@chakra-ui/react";
import { FaBed, FaBath, FaMapMarkerAlt } from "react-icons/fa";
import { GiHouse } from "react-icons/gi";
import { mockNests } from "../api/mockApi";
import { Carousel } from "./carousel";

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

  console.log(house);

  return (
    <Center>
      <HStack>
        <Box
          maxW="xl"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="4"
          boxShadow="lg"
          bg="white"
          color="gray.700"
        >
          <Heading size="lg" mb="4">
            {title}
          </Heading>
          <Text fontSize="md" mb="2" color="gray.600">
            {description}
          </Text>
          <Divider my="4" />
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <FaMapMarkerAlt /> <Text ml="2">{location.address}</Text>
            </GridItem>
            <GridItem>
              <GiHouse /> <Text ml="2">{layout.area} sqft</Text>
            </GridItem>
            <GridItem>
              <FaBed /> <Text ml="2">{layout.bed} Bedrooms</Text>
            </GridItem>
            <GridItem>
              <FaBath /> <Text ml="2">{layout.bath} Bathrooms</Text>
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
        <Carousel />
      </HStack>
    </Center>
  );
};

export default Nest;
