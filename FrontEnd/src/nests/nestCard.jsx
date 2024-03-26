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
    name,
    description,
    address,
    bedroom,
    rent,
    bachelor,
    bathroom,
    area,
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
            {name}
          </Text>
        </HStack>
        <Text>{description}</Text>
        <Center w={"100%"}>
          <HStack>
            <Badge colorScheme={bachelor === true ? "green" : "red"}>
              {bachelor === true ? (
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
            {/* <Badge
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
            </Badge> */}
          </HStack>
        </Center>
        <HStack>
          <InfoCard
            icon={<FaBed />}
            label={bedroom + " Bedrooms"}
            text={bedroom + " Beds"}
          />
          <InfoCard
            icon={<FaBath />}
            label={bathroom + " Bathrooms"}
            text={bathroom + " Baths"}
          />
        </HStack>
        <HStack>
          <InfoCard
            icon={<GiHouse />}
            label={"Total Area: " + area + " sqft"}
            text={area + " sqft"}
          />
          <InfoCard
            icon={<FaDollarSign />}
            label={"Monthly Rent: " + rent + " tk"}
            text={rent + " tk"}
          />
        </HStack>
        <HStack>
          <InfoCard
            icon={<FaMapMarkerAlt />}
            label={"Address: " + address}
            text={address}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default NestCard;
