import { Box, VStack, HStack, Button } from "@chakra-ui/react";
import LocationPicker from "./locationPicker";

const Part3 = ({ formdata, setFormdata, onNext, onPrev }) => {
  return (
    <Box w="60%" bg="white" mt={8} p={4} borderWidth="1px" borderRadius="lg">
      <LocationPicker formdata={formdata} setFormdata={setFormdata} />
      <VStack spacing={4}>
        <HStack w="100%">
          <Button type="submit" colorScheme="blue" w="50%" onClick={onPrev}>
            Prev
          </Button>
          <Button type="submit" colorScheme="blue" w="50%" onClick={onNext}>
            Next
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Part3;
