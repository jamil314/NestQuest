import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  InputGroup,
  InputRightElement,
  IconButton,
  Link,
  Center,
  HStack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { useState } from "react";

import loginIcon from "../assets/birdhouse-login.png";
import { login } from "../api";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        email: formData.email,
        password: formData.password,
      });
      const { user, token } = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      toast({
        title: "Login Successfull",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setTimeout(() => {
        window.location.href = "/map";
      }, 2 * 1000);
    } catch (error) {
      switch (error.response.status) {
        case 404:
          setModalMessage("Invalid email or password");
          onOpen();
          break;
        case 400:
          setModalMessage("Invalid format");
          onOpen();
          break;
        case 500:
          setModalMessage("Network error");
          onOpen();
          break;
        default:
          break;
      }
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMessage, setModalMessage] = useState("");
  return (
    <>
      <Box
        maxW="md"
        mx="auto"
        p={10}
        borderWidth="1px"
        borderRadius="lg"
        bg="rgba(204, 230, 148, 0.5)"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        backdropFilter="blur(3.5px)"
        WebkitBackdropFilter="blur(3.5px)"
        border="1px solid #7ba121"
        color="#663b1e"
      >
        <Center mb={4} textAlign="center">
          <HStack fontSize={"2rem"} fontWeight={"bold"}>
            <Image src={loginIcon} h={"4rem"} />
            <h1>Log In</h1>
          </HStack>
        </Center>
        <form onSubmit={handleSubmit}>
          <FormControl
            id="email"
            isRequired
            _hover={{
              input: {
                borderColor: "#7ba121",
              },
            }}
          >
            <FormLabel fontWeight="900" fontSize="1.2rem">
              Email Address:
            </FormLabel>
            <Input
              type="text"
              placeholder="Enter your email"
              borderColor="#663b1e"
              bg="rgba(204, 230, 148, 0.75)"
              _focusVisible={{
                borderColor: "#7ba121",
              }}
              _placeholder={{ color: "#9e9c70" }}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </FormControl>

          <FormControl
            id="password"
            mt={4}
            isRequired
            _hover={{
              input: {
                borderColor: "#7ba121",
              },
            }}
          >
            <FormLabel fontWeight="900" fontSize="1.2rem">
              Password
            </FormLabel>
            <InputGroup>
              <Input
                borderColor="#663b1e"
                bg="rgba(204, 230, 148, 0.75)"
                _focusVisible={{
                  borderColor: "#7ba121",
                }}
                _placeholder={{ color: "#9e9c70" }}
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  h="1.75rem"
                  size="sm"
                  bgColor="#663b1e"
                  color="#b8d280"
                  _hover={{
                    bgColor: "#461b0e",
                    color: "#d8f2a0",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                  icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            mt={8}
            type="submit"
            width="100%"
            bgColor="#663b1e"
            color="#b8d280"
            _hover={{
              bgColor: "#461b0e",
              color: "#d8f2a0",
            }}
          >
            Log In
          </Button>
        </form>
        <Box mt={4} textAlign="right">
          <Link color="461b0e" href="#" fontSize="lg">
            Forgot Password?
          </Link>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Sign up Failed </ModalHeader>
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

export default Login;
