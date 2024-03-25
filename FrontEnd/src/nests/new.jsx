import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  useSteps,
  HStack,
  VStack,
  Flex,
  Text,
  Checkbox,
} from "@chakra-ui/react";
// import { Step, Steps, useSteps } from "chakra-ui-steps";

const steps = [
  { descriptions: ["Address", "Layout"] },
  { descriptions: ["Terms & Condition", "Restrictions"] },
  { descriptions: ["Utilities", "Amenities"] },
];

const NewNest = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const [formData, setFormData] = useState({
    bed: 3,
    bath: 3,
    drawing: true,
    dinning: true,
    totalfloor: 10,
    vacantfloors: [2, 5],
    area: 1600,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const StepperComponent = () => {
    return (
      <Stepper index={activeStep} width="90vw" p="1rem 0">
        {steps.map((step, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink="0">
              {/* <StepTitle>{step.title}</StepTitle> */}
              {step.descriptions.map((description, id) => {
                <StepDescription id={id}>{description}</StepDescription>;
              })}
              {/* <StepDescription>{step.description}</StepDescription> */}
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    );
  };

  const Pages = [<Page1 key={0} />, <Page2 key={1} />, <Page3 key={2} />];

  return (
    <VStack h="100vh" paddingInline={2}>
      <StepperComponent />
      {/* <Page1 /> */}
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        backgroundColor="rgba(255, 255, 255, 0.5)"
        backdropFilter="blur(8px)"
        className="layout"
      >
        <Stack spacing={4}>
          <Flex justify="space-between" align="center">
            <Text fontSize="xl" fontWeight="bold">
              Layout
            </Text>
          </Flex>
          <FormControl as={HStack}>
            <FormLabel>Bedrooms</FormLabel>
            <Input
              type="number"
              name="bed"
              value={formData.bed}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl as={HStack}>
            <FormLabel>Bathrooms</FormLabel>
            <Input
              type="number"
              name="bath"
              value={formData.bath}
              onChange={handleChange}
            />
          </FormControl>
          <Checkbox
            name="drawing"
            isChecked={formData.drawing}
            onChange={handleChange}
          >
            Drawing Room
          </Checkbox>
          <Checkbox
            name="dinning"
            isChecked={formData.dinning}
            onChange={handleChange}
          >
            Dining Room
          </Checkbox>
          <FormControl as={HStack}>
            <FormLabel>Total Floors</FormLabel>
            <Input
              type="number"
              name="totalfloor"
              value={formData.totalfloor}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl as={HStack}>
            <FormLabel>Vacant Floors</FormLabel>
            <Stack direction="row">
              {[...Array(formData.totalfloor)].map((_, index) => (
                <Checkbox
                  key={index}
                  name={`vacantfloors-${index}`}
                  isChecked={formData.vacantfloors.includes(index + 1)}
                  onChange={(e) => {
                    const floor = index + 1;
                    if (e.target.checked) {
                      setFormData((prevData) => ({
                        ...prevData,
                        vacantfloors: [...prevData.vacantfloors, floor],
                      }));
                    } else {
                      setFormData((prevData) => ({
                        ...prevData,
                        vacantfloors: prevData.vacantfloors.filter(
                          (f) => f !== floor
                        ),
                      }));
                    }
                  }}
                >
                  {index + 1}
                </Checkbox>
              ))}
            </Stack>
          </FormControl>
          <FormControl as={HStack}>
            <FormLabel>Area (sq ft)</FormLabel>
            <Input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
            />
          </FormControl>
          <Button
            colorScheme="blue"
            onClick={() => {
              console.log(formData);
              setActiveStep(formData.bed);
            }}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </VStack>
  );
};

export default NewNest;
