import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Checkbox,
  VStack,
  Button,
} from "@chakra-ui/react";

const Part1 = ({ formdata, setFormdata, onNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const clickedBtn = e.nativeEvent.submitter.getAttribute("name");
    const formData2 = new FormData(e.target);
    const diff = {};
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    formData2.forEach((value, key) => {
      diff[key] = e.target[key].type === "checkbox" ? true : value;
    });

    checkboxes.forEach((checkbox) => {
      const name = checkbox.name;
      const value = checkbox.checked;
      diff[name] = value;
    });

    setFormdata({ ...formdata, ...diff });

    if (clickedBtn === "next") onNext();
    // else if (clickedBtn === "prev") onPrev();
  };

  const InputGroup = ({ label, children, height }) => {
    return (
      <FormControl>
        <Flex justifyContent="flex-start">
          <FormLabel
            htmlFor="name"
            w="100px"
            textAlign="end"
            alignContent="center"
            h={height || "40px"}
          >
            {label}
          </FormLabel>
          {children}
        </Flex>
      </FormControl>
    );
  };

  return (
    <>
      <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <InputGroup label="Name">
              <Input
                id="name"
                name="name"
                type="text"
                defaultValue={formdata.name}
                placeholder="Enter house name"
              />
            </InputGroup>
            <InputGroup label="Description">
              <Input
                id="description"
                name="description"
                type="text"
                defaultValue={formdata.description}
                placeholder="Enter description"
              />
            </InputGroup>
            <InputGroup label="Address">
              <Input
                id="address"
                name="address"
                type="text"
                defaultValue={formdata.address}
                placeholder="Enter address"
              />
            </InputGroup>

            <Flex>
              <FormLabel
                htmlFor="name"
                w="100px"
                textAlign="end"
                alignContent="center"
                h={"72px"}
              >
                Layout
              </FormLabel>
              <FormControl marginRight="8px" width="calc(33% - 25px)">
                <FormLabel htmlFor="bedroom">Bedroom</FormLabel>
                <Input
                  id="bedroom"
                  name="bedroom"
                  type="number"
                  defaultValue={formdata.bedroom}
                  placeholder="Bedroom"
                />
              </FormControl>

              <FormControl marginRight="8px" width="calc(33% - 25px)">
                <FormLabel htmlFor="bathroom">Bathroom</FormLabel>
                <Input
                  id="bathroom"
                  name="bathroom"
                  type="number"
                  defaultValue={formdata.bathroom}
                  placeholder="Bathroom"
                />
              </FormControl>

              <FormControl marginRight="8px" width="calc(33% - 25px)">
                <FormLabel htmlFor="floor">Floor</FormLabel>
                <Input
                  id="floor"
                  name="floor"
                  type="number"
                  defaultValue={formdata.floor}
                  placeholder="Floor"
                />
              </FormControl>
            </Flex>

            <InputGroup label="Area (sqft)">
              <Input
                id="area"
                name="area"
                type="number"
                defaultValue={formdata.area}
                placeholder="Area"
              />
            </InputGroup>
            <InputGroup label="Rent">
              <Input
                id="rent"
                name="rent"
                type="number"
                defaultValue={formdata.rent}
                placeholder="Rent"
              />
            </InputGroup>
            <InputGroup label="Bachelor">
              <Checkbox
                w="100%"
                id="bachelor"
                name="bachelor"
                defaultChecked={formdata.bachelor}
              >
                {/* {this. ? "Allowed" : "Not allowed"} */}
              </Checkbox>
            </InputGroup>

            <Button
              name="next"
              type="submit"
              colorScheme="blue"
              w="100%"
              //   onClick={onNext}
            >
              Next
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  );
};

export default Part1;
