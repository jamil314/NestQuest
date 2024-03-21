import { Card, CardBody, Image, Center, Text } from "@chakra-ui/react";
import guest from "../assets/bird-guest.png";

const Guest = () => {
  return (
    <Card
      maxW={"3xs"}
      cursor={"pointer"}
      _hover={{
        "& img": {
          transform: "scale(1.1)",
          transition: "transform 0.3s ease",
        },
        "& .guest-text": {
          fontWeight: "bold",
          transition: "all 0.3s ease",
        },
      }}
    >
      <CardBody>
        <Image src={guest} alt="guest-bird" transition="transform 0.3s ease" />
        <Center w={"100%"}>
          <Text
            // fontSize="2xl"
            className="guest-text"
            transition="all 0.3s ease"
          >
            Continue as Guest
          </Text>
        </Center>
      </CardBody>
    </Card>
  );
};

export default Guest;
