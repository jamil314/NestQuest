import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Checkbox,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";

const Part2 = ({ formdata, setFormdata, onNext, onPrev }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const clickedBtn = e.nativeEvent.submitter.getAttribute("name");
    const formData2 = new FormData(e.target);
    const diff = {};
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    formData2.forEach((value, key) => {
      switch (e.target[key].type) {
        case "checkbox":
          diff[key] = true;
          break;
        case "number":
          diff[key] = Number(value);
          break;
        default:
          diff[key] = value;
          break;
      }
    });

    checkboxes.forEach((checkbox) => {
      const name = checkbox.name;
      const value = checkbox.checked;
      diff[name] = value;
    });

    setFormdata({ ...formdata, ...diff });

    if (clickedBtn === "next") onNext();
    else if (clickedBtn === "prev") onPrev();
  };

  const InputGroup = ({ label, children, height, width }) => {
    return (
      <FormControl>
        <Flex justifyContent="flex-start">
          <FormLabel
            htmlFor="name"
            w={width || "200px"}
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
      <Box
        w="60%"
        bg="white"
        mx="auto"
        mt={8}
        p={4}
        borderWidth="1px"
        borderRadius="lg"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <HStack spacing={4}>
              <VStack
                flexDir="column"
                align="flex-start"
                borderRight="1px solid"
                borderColor="inherit"
                p={2}
                // bg="yellow"
                w="100%"
              >
                <Checkbox name="furnished" defaultChecked={formdata.furnished}>
                  Furnished?
                </Checkbox>
                <Checkbox name="ac" defaultChecked={formdata.ac}>
                  Air Conditioning?
                </Checkbox>
                <Checkbox name="oven" defaultChecked={formdata.oven}>
                  Oven?
                </Checkbox>
                <Checkbox name="fridge" defaultChecked={formdata.fridge}>
                  Fridge?
                </Checkbox>
                <Checkbox name="heater" defaultChecked={formdata.heater}>
                  Heater?
                </Checkbox>
                <Checkbox name="geyser" defaultChecked={formdata.geyser}>
                  Geyser?
                </Checkbox>
              </VStack>
              <VStack w="100%">
                <VStack
                  flexDir="column"
                  align="flex-start"
                  borderBottom="1px solid"
                  borderColor="inherit"
                  p={2}
                >
                  <InputGroup label="Gas" width="50px">
                    <Input
                      id="gas"
                      name="gas"
                      type="text"
                      defaultValue={formdata.gas}
                      placeholder="PrePaid"
                    />
                  </InputGroup>
                  <Checkbox
                    name="electricity"
                    defaultChecked={formdata.electricity}
                  >
                    Electricity?
                  </Checkbox>
                  <Checkbox name="water" defaultChecked={formdata.water}>
                    Water?
                  </Checkbox>
                  <Checkbox name="lift" defaultChecked={formdata.lift}>
                    Lift?
                  </Checkbox>
                </VStack>
                <VStack flexDir="column" align="flex-start" p={2} w="100%">
                  <Checkbox name="petCat" defaultChecked={formdata.petCat}>
                    Cat Allowed?
                  </Checkbox>
                  <Checkbox name="petDog" defaultChecked={formdata.petDog}>
                    Dog Allowed?
                  </Checkbox>
                </VStack>
              </VStack>
            </HStack>
            <InputGroup label="Other Restrictions">
              <Input
                id="otherRestrictions"
                name="otherRestrictions"
                type="text"
                defaultValue={formdata.otherRestrictions}
                placeholder="Additional Restrictions"
              />
            </InputGroup>
            <InputGroup label="Security Deposit">
              <Input
                id="securityDeposit"
                name="securityDeposit"
                type="number"
                defaultValue={formdata.securityDeposit}
                placeholder="Security Deposit"
              />
            </InputGroup>
            <InputGroup label="Service Charge">
              <Input
                id="serviceCharge"
                name="serviceCharge"
                type="number"
                defaultValue={formdata.serviceCharge}
                placeholder="Service Charge"
              />
            </InputGroup>
            <HStack w="100%">
              <Button
                type="submit"
                id="prev"
                name="prev"
                colorScheme="blue"
                w="50%"
              >
                Prev
              </Button>
              <Button
                type="submit"
                id="next"
                name="next"
                colorScheme="blue"
                w="50%"
              >
                Next
              </Button>
            </HStack>
          </VStack>
        </form>
      </Box>
    </>
  );
};

export default Part2;
