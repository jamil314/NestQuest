import Login from "./login";
import Signup from "./signup";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  HStack,
  Center,
  Image,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import SSO from "./sso";
import loginIcon from "../assets/birdhouse-login.png";
import signupIcon from "../assets/nest-signup.png";
import nestBg from "../assets/nest-bg.jpg";
import logo from "../assets/logo.png";

const Auth = () => {
  // const logoSize = useBreakpointValue({ base: "80px", md: "100px" });
  const centerWidth = useBreakpointValue({ base: "80%", md: "40vw" });
  const logoShift = useBreakpointValue({ base: "10%", md: "0%" });
  return (
    <Box bgImage={nestBg} bgSize={"cover"} bgPos={"left"}>
      <Center h="20vh" position="absolute" w="100vw">
        <Image src={logo} position="relative" left={logoShift} />
      </Center>
      <Center h={"100vh"} w={centerWidth}>
        <VStack>
          <Tabs isFitted height="var(--fs-1) * 35">
            <TabList>
              <Tab
                _selected={{ color: "#7ba121", borderColor: "#7ba121" }}
                fontWeight={"bold"}
              >
                <Image src={signupIcon} h="var(--fs-2)" mr="var(--fs-sm)" />{" "}
                Sign Up
              </Tab>
              <Tab
                _selected={{ color: "#7ba121", borderColor: "#7ba121" }}
                fontWeight={"bold"}
              >
                <Image src={loginIcon} h="var(--fs-2)" mr="var(--fs-sm)" /> Log
                in
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Signup />
              </TabPanel>
              <TabPanel>
                <Login />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <HStack>
            <SSO />
          </HStack>
        </VStack>
      </Center>
    </Box>
  );
};

export default Auth;
