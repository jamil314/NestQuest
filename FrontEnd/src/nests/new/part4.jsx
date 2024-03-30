import {
  Box,
  Input,
  VStack,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Grid,
  GridItem,
  Image,
  Stack,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const Part4 = ({ formdata, setFormdata, onNext, onPrev }) => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageUrl, setImageUrl] = useState("");

  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const newImage = {
        url: e.target.result,
        file,
      };
      setImages([...images, newImage]);
    };
    reader.readAsDataURL(file);
  };

  const handleAddImageUrl = () => {
    if (!imageUrl) return;

    setImages([...images, { url: imageUrl }]);
    setImageUrl("");
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSelectImage = (index) => {
    setSelectedImage(images[index]);
    onOpen();
  };

  const handleDeleteImage = () => {
    if (!selectedImage) return;

    const index = images.findIndex((img) => img === selectedImage);
    if (index !== -1) handleRemoveImage(index);

    setSelectedImage(null);
    onClose();
  };

  return (
    <Box w="60%" bg="white" mt={8} p={4} borderWidth="1px" borderRadius="lg">
      <Box maxW="md" mx="auto" mt={4}>
        <form>
          <Box marginBottom={4}>
            <Stack spacing={4} direction="column">
              <Text
                align="center"
                marginBottom={4}
                fontSize="larger"
                borderBottom="1px solid"
                borderColor="inherit"
              >
                Upload Images
              </Text>
              <Input type="file" accept="image/*" onChange={handleAddImage} />
              <Text align="center">Or</Text>
              <HStack>
                <Button onClick={handleAddImageUrl}>Get Image</Button>
                <Input
                  placeholder="Add image from URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </HStack>
            </Stack>
            <Grid
              templateColumns="repeat(3, 1fr)"
              gap={4}
              mt={4}
              overflowY="scroll"
              maxH="50vh"
            >
              {images.map((image, index) => (
                <GridItem key={index}>
                  <Box
                    position="relative"
                    cursor="pointer"
                    onClick={() => handleSelectImage(index)}
                  >
                    <Image src={image.url} alt={`Image ${index}`} />
                    <Button
                      size="sm"
                      position="absolute"
                      top={1}
                      right={1}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(index);
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                </GridItem>
              ))}
            </Grid>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Image Preview</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {selectedImage && (
                    <Box>
                      <Image src={selectedImage.url} alt="Selected Image" />
                      <Button
                        mt={4}
                        colorScheme="red"
                        onClick={handleDeleteImage}
                      >
                        Delete Image
                      </Button>
                    </Box>
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
          <VStack spacing={4}>
            <HStack w="100%">
              <Button type="submit" colorScheme="blue" w="50%" onClick={onPrev}>
                Prev
              </Button>
              <Button type="submit" colorScheme="blue" w="50%" onClick={onNext}>
                Submit
              </Button>
            </HStack>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Part4;
