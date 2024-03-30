import { useState } from "react";
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  useSteps,
  VStack,
  HStack,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  Image,
} from "@chakra-ui/react";
import Part1 from "./part1";
import Part2 from "./part2";
import Part3 from "./part3";
import { createNest } from "../../api";
import bg from "../../assets/nest-bg.jpg";
import gif from "../../assets/bird-gif.gif";
import Part4 from "./part4";

// import { Step, Steps, useSteps } from "chakra-ui-steps";

const steps = [
  { descriptions: ["Address", "Layout"] },
  { descriptions: ["Terms & Condition", "Restrictions"] },
  { descriptions: ["Location"] },
  { descriptions: ["Photos"] },
];

const NewNest = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    bedroom: "",
    bathroom: "",
    floor: "",
    area: "",
    rent: "",
    bachelor: true,
    lat: "",
    long: "",
    furnished: false,
    ac: false,
    oven: false,
    fridge: false,
    heater: false,
    geyser: false,
    petDog: false,
    petCat: false,
    gas: "",
    electricity: false,
    water: false,
    securityDeposit: "",
    otherRestrictions: "",
    lift: false,
    serviceCharge: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMessage, setModalMessage] = useState("");
  const toast = useToast();

  const submitNest = (e) => {
    e.preventDefault();
    const optionalFields = ["description", "otherRestrictions"];
    const missingFields = [];
    const validFormData = Object.keys(formData).reduce((acc, cur) => {
      const notMissing = optionalFields.includes(cur) || formData[cur] !== "";
      if (!notMissing) missingFields.push(cur);
      return acc && notMissing;
    }, true);
    if (validFormData) {
      try {
        const nestId = createNest(formData);
        toast({
          title: "Nest Added",
          description: "New nest added wit id: " + nestId,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        window.history.back();
      } catch (error) {
        console.log(error);
      }
    } else {
      setModalMessage(
        "These Fields are missing: " + missingFields.toLocaleString()
      );
      onOpen();
    }
  };

  const StepperComponent = () => {
    return (
      <Stepper
        right="0"
        top="10%"
        pos="fixed"
        h="80%"
        index={activeStep}
        // width="60%"
        p="1rem"
        backdropBlur={3}
        // bg="rgba(184, 210, 128, 1.5)"
        // color="#663B1E"
        // bgColor="#B8D280"
        bg="white"
        roundedBottomLeft={16}
        roundedTopLeft={16}
        orientation="vertical"
      >
        {steps.map((step, index) => (
          <Step
            key={index}
            // onClick={() => setActiveStep(index)}
          >
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

  const Pages = [
    <Part1
      key={1}
      formdata={formData}
      setFormdata={setFormData}
      onNext={() => {
        setActiveStep(1);
      }}
    />,
    <Part2
      key={2}
      formdata={formData}
      setFormdata={setFormData}
      onNext={() => {
        setActiveStep(2);
      }}
      onPrev={() => {
        setActiveStep(0);
      }}
    />,
    <Part3
      key={2}
      formdata={formData}
      setFormdata={setFormData}
      onNext={() => {
        setActiveStep(3);
      }}
      onPrev={() => {
        setActiveStep(1);
      }}
    />,
    <Part4
      key={3}
      formdata={formData}
      setFormdata={setFormData}
      onNext={submitNest}
      onPrev={() => {
        setActiveStep(2);
      }}
    />,
  ];

  return (
    <>
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(8px)",
          // zIndex: "1",
        }}
      />
      <HStack
        w="100vw"
        h="100vh"
        backgroundImage={bg}
        // blur={12}
        // bgColor="#B8D280"
        bgSize={"cover"}
        bgPos={"left"}
        paddingInline={2}
        zIndex={3}
      >
        <Center w="30%" ml="10%" position="relative">
          <Image src={gif} borderRadius={12} shadow={12} />
        </Center>
        <VStack w="50%" h="100%" position="relative">
          <StepperComponent />
          <Center h="100%" w="100%" backdropBlur={3} borderColor="#663B1E">
            {Pages[activeStep]}
          </Center>
        </VStack>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Upload Failed </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalMessage}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewNest;
