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
  StepTitle,
  Stepper,
  useSteps,
  HStack,
  VStack,
  Center,
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

const MultiStepForm = () => {
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

  return (
    <VStack h="100vh" paddingInline={2}>
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

// const MultiStepForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });

//   const { nextStep, prevStep, reset, activeStep } = useSteps({
//     initialStep: 0,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here
//     console.log("Form submitted:", formData);
//     // Reset form after submission
//     setFormData({
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//     });
//     reset();
//   };

//   return (
//     <ChakraProvider>
//       <Box maxW="md" mx="auto" p="6">
//         <Stepper activeStep={activeStep} colorScheme="blue">
//           {steps.map((step, index) => (
//             <Step key={index} label={step.label}>
//               <Box p={4}>{step.content}</Box>
//             </Step>
//           ))}
//         </Stepper>
//         <form onSubmit={handleSubmit}>
//           {activeStep === 0 && (
//             <Stack spacing="4">
//               <FormControl id="firstName">
//                 <FormLabel>First Name</FormLabel>
//                 <Input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                 />
//               </FormControl>
//               <FormControl id="lastName">
//                 <FormLabel>Last Name</FormLabel>
//                 <Input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                 />
//               </FormControl>
//             </Stack>
//           )}
//           {activeStep === 1 && (
//             <Stack spacing="4">
//               <FormControl id="email">
//                 <FormLabel>Email Address</FormLabel>
//                 <Input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                 />
//               </FormControl>
//               <FormControl id="password">
//                 <FormLabel>Password</FormLabel>
//                 <Input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                 />
//               </FormControl>
//             </Stack>
//           )}
//           <Stack direction="row" spacing="4" mt="6">
//             {activeStep > 0 && (
//               <Button leftIcon={<ChevronLeftIcon />} onClick={prevStep}>
//                 Previous
//               </Button>
//             )}
//             {activeStep < steps.length - 1 && (
//               <Button
//                 rightIcon={<ChevronRightIcon />}
//                 onClick={nextStep}
//                 colorScheme="blue"
//               >
//                 Next
//               </Button>
//             )}
//             {activeStep === steps.length - 1 && (
//               <Button type="submit" colorScheme="blue">
//                 Submit
//               </Button>
//             )}
//           </Stack>
//         </form>
//       </Box>
//     </ChakraProvider>
//   );
// };

export default MultiStepForm;
