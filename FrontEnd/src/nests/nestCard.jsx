import {
  Box,
  Badge,
  Text,
  VStack,
  HStack,
  StackDivider,
  Tooltip,
  Image,
  Center,
} from "@chakra-ui/react";
import { FaBed, FaBath, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { GiHouse } from "react-icons/gi";
import icon from "../assets/mockNest/bedroom.jpg";

const InfoCard = ({ icon, label, text }) => {
  return (
    <Tooltip label={label}>
      <HStack shadow="lg" p="1rem" h="2rem" borderRadius="md">
        {icon}
        <Text>{text}</Text>
      </HStack>
    </Tooltip>
  );
};

const NestCard = (nest) => {
  const {
    title,
    description,
    location,
    layout,
    leaseTerms,
    tenantRestrictions,
  } = nest;
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
      <VStack spacing="2" divider={<StackDivider />}>
        <HStack>
          <Image src={icon} w={"50%"} />
          <Text fontSize="xl" fontWeight="bold">
            {title}
          </Text>
        </HStack>
        <Text>{description}</Text>
        <Center w={"100%"}>
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
          </HStack>
        </Center>
        <HStack>
          <InfoCard
            icon={<FaBed />}
            label={layout.bed + " Bedrooms"}
            text={layout.bed + " Beds"}
          />
          <InfoCard
            icon={<FaBath />}
            label={layout.bath + " Bathrooms"}
            text={layout.bath + " Baths"}
          />
        </HStack>
        <HStack>
          <InfoCard
            icon={<GiHouse />}
            label={"Total Area: " + layout.area + " sqft"}
            text={layout.area + " sqft"}
          />
          <InfoCard
            icon={<FaDollarSign />}
            label={"Monthly Rent: " + leaseTerms.rent.amount + " tk"}
            text={leaseTerms.rent.amount + " tk"}
          />
        </HStack>
        <HStack>
          <InfoCard
            icon={<FaMapMarkerAlt />}
            label={"Address: " + location.address}
            text={location.address}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default NestCard;
