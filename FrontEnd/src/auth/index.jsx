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
} from "@chakra-ui/react";
import SSO from "./sso";
import loginIcon from "../assets/birdhouse-login.png";
import signupIcon from "../assets/nest-signup.png";
import nestBg from "../assets/nest-bg.jpg";
import logo from "../assets/logo.png";

const Auth = () => {
  return (
    <Box bgImage={nestBg} bgSize={"cover"} bgPos={"left"}>
      <Center h="20vh" position="absolute" w="100vw">
        <Image src={logo} />
      </Center>
      <Center h={"100vh"} w={"40vw"}>
        <VStack>
          <Tabs isFitted height="35rem">
            <TabList>
              <Tab
                _selected={{ color: "#7ba121", borderColor: "#7ba121" }}
                fontWeight={"bold"}
              >
                <Image src={signupIcon} h="1.5rem" mr="0.5rem" /> Sign Up
              </Tab>
              <Tab
                _selected={{ color: "#7ba121", borderColor: "#7ba121" }}
                fontWeight={"bold"}
              >
                <Image src={loginIcon} h="1.5rem" mr="0.5rem" /> Log in
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
