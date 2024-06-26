import { Image, HStack, Center, Text, Box } from "@chakra-ui/react";
const SSOItem = ({ title, icon, onClick }) => {
  return (
    <Box
      align={"row"}
      borderRadius={"2rem"}
      w={"20rem"}
      p={2}
      bg="rgba(255, 255, 255, 0.2)"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(3.5px)"
      WebkitBackdropFilter="blur(3.5px)"
      _hover={{
        borderInline: "2px solid black",
        "& img": {
          transition: "transform 0.3s ease",
        },
        "& .label": {
          wordSpacing: "2px",
          letterSpacing: "1px",
          transition: "all 0.3s ease",
        },
      }}
      cursor={"pointer"}
      onClick={onClick}
    >
      <HStack>
        <Image src={icon} h={"2rem"} transition="transform 0.3s ease" />
        <Center w={"100%"}>
          <Text transition="all 0.3s ease" className="label" fontWeight="900">
            {title}
          </Text>
        </Center>
      </HStack>
    </Box>
  );
};

export default SSOItem;
