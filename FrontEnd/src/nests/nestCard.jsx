import {
  Box,
  Badge,
  Text,
  VStack,
  HStack,
  StackDivider,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { FaBed, FaBath, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";

const NestCard = (nest) => {
  const {
    title,
    description,
    location,
    layout,
    leaseTerms,
    tenantRestrictions,
  } = nest;
  console.log(leaseTerms);
  return (
    <Box
      padding="0"
      margin="0"
      border="none"
      borderRadius="lg"
      p="4"
      bg="white"
      //   boxShadow="md"
      maxW="md"
      w="100%"
      onClick={() => (window.location.href = "/nest/" + nest.id)}
    >
      <VStack spacing="1" divider={<StackDivider />}>
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>
        <Text>{description}</Text>
        <HStack>
          <Badge
            colorScheme={
              tenantRestrictions.bachelor === "allowed" ? "green" : "red"
            }
          >
            {tenantRestrictions.bachelor === "allowed" ? (
              <TiTick
                style={{ display: "inline-block", verticalAlign: "middle" }}
              />
            ) : (
              <ImCross
                style={{ display: "inline-block", verticalAlign: "middle" }}
              />
            )}
            bachelor
          </Badge>
          <Badge
            colorScheme={
              tenantRestrictions.family === "allowed" ? "green" : "red"
            }
          >
            {tenantRestrictions.family === "allowed" ? (
              <TiTick
                style={{ display: "inline-block", verticalAlign: "middle" }}
              />
            ) : (
              <ImCross
                style={{ display: "inline-block", verticalAlign: "middle" }}
              />
            )}
            family
          </Badge>
          <Badge colorScheme="blue">{leaseTerms.advance} Advance</Badge>
          <Badge colorScheme="blue">{leaseTerms.duration}</Badge>
          <Badge colorScheme="blue">
            {leaseTerms.amount} {leaseTerms.duration}
          </Badge>
        </HStack>
        <HStack>
          <Tooltip label="Bedrooms" hasArrow>
            <IconButton
              aria-label="Bedrooms"
              icon={<FaBed />}
              variant="outline"
            />
          </Tooltip>
          <Text>{layout.bed} Beds</Text>
          <Tooltip label="Bathrooms" hasArrow>
            <IconButton
              aria-label="Bathrooms"
              icon={<FaBath />}
              variant="outline"
            />
          </Tooltip>
          <Text>{layout.bath} Baths</Text>
        </HStack>
        <HStack>
          <Tooltip label="Rent" hasArrow>
            <IconButton
              aria-label="Rent"
              icon={<FaDollarSign />}
              variant="outline"
            />
          </Tooltip>
          <Text>{leaseTerms.rent.amount} tk</Text>
        </HStack>
        <HStack>
          <Tooltip label="Location" hasArrow>
            <IconButton
              aria-label="Location"
              icon={<FaMapMarkerAlt />}
              variant="outline"
            />
          </Tooltip>
          <Text>{location.address}</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default NestCard;
