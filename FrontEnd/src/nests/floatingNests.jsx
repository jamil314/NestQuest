import { useEffect } from "react";
import {
  Box,
  HStack,
  useDisclosure,
  VStack,
  IconButton,
} from "@chakra-ui/react";

import NestCardWide from "./nestCardWide";
import { TbArrowBarToDown } from "react-icons/tb";

const FloatingNests = ({ nests, flyTo }) => {
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    onToggle();
  }, []);

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      transform={`translateX(${isOpen ? `0` : `calc(-100% + 40px)`})`}
      bg="rgba(255, 255, 255, 0.3)"
      p={0}
      borderRadius="md"
      boxShadow="lg"
      backdropFilter="blur(5px)"
      zIndex="9999"
      transition="transform 0.3s ease"
    >
      <HStack>
        <Box overflowY="scroll" maxH="100vh" dir="rtl">
          <VStack>
            {nests.map((nest, id) => {
              return <NestCardWide nest={nest} key={id} moveTo={flyTo} />;
            })}
          </VStack>
        </Box>
        <IconButton
          h="100vh"
          icon={
            <TbArrowBarToDown
              size={40}
              style={{ rotate: isOpen ? "90deg" : "-90deg" }}
            />
          }
          onClick={onToggle}
        ></IconButton>
      </HStack>
    </Box>
  );
};

export default FloatingNests;
