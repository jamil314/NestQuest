import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  InputGroup,
  InputRightElement,
  IconButton,
  Image,
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
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";

import signup from "../assets/nest-signup.png";
import { getEmailAvailibility, signUp } from "../api";

const invalidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(email);
};
const invalidPassword = (password) => {
  const re = /^[a-zA-Z0-9_]{6,25}$/;
  return !re.test(password);
};

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = async (e) => {
    const { value } = e.target;
    setFormData({ ...formData, email: value });
    if (invalidEmail(value)) {
      setFormError({ ...formError, email: "Invalid email format" });
    } else {
      try {
        await getEmailAvailibility(value);
        setFormError({ ...formError, email: "" });
      } catch (error) {
        switch (error.response.status) {
          case 409:
            setFormError({ ...formError, email: "Email already taken" });
            break;
          case 400:
            setFormError({ ...formError, email: "Invalid email format" });
            break;
          case 500:
            setFormError({ ...formError, email: "Network error" });
            break;
          default:
            break;
        }
      }
    }
  };

  const handlePassChange = async (e) => {
    const { value } = e.target;
    setFormData({ ...formData, password: value });
    setFormError({
      ...formError,
      confirm: formData.confirm === value ? "" : "Passwords dont match",
      password:
        value.length < 6
          ? "At least 6 characters"
          : invalidPassword(value)
          ? "only 'a-z,A-z,0-9,_' are allowed"
          : "",
    });
  };
  const handleConfirmChange = async (e) => {
    const { value } = e.target;
    setFormData({ ...formData, confirm: value });
    setFormError({
      ...formError,
      confirm: formData.password === value ? "" : "Passwords dont match",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signUp({
        email: formData.email,
        password: formData.password,
        firstname: "",
        lastname: "",
        phonenumber: "",
      });
      console.log(res.data);
      const { id, username, token } = res.data;
      localStorage.setItem("id", id);
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      window.location.href = "/map";
    } catch (error) {
      console.log(error);
      switch (error.response.status) {
        case 409:
          setModalMessage("Email already exists");
          onOpen();
          break;
        case 400:
          setModalMessage("Invalid email format");
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
            <Image src={signup} h={"4rem"} />
            <h1>Sign Up</h1>
          </HStack>
        </Center>
        <form onSubmit={handleSubmit}>
          <FormControl
            isInvalid={formError.email !== ""}
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
              type="email"
              placeholder="Enter your email"
              borderColor="#663b1e"
              bg="rgba(204, 230, 148, 0.75)"
              _focusVisible={{
                borderColor: "#7ba121",
              }}
              _placeholder={{ color: "#9e9c70" }}
              onChange={handleEmailChange}
            />
            <FormErrorMessage>{formError.email}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={formError.password !== ""}
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
                onChange={handlePassChange}
              />
              <InputRightElement width="4rem">
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
            <FormErrorMessage>{formError.password}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={formError.confirm !== ""}
            id="confirmPassword"
            mt={4}
            isRequired
            _hover={{
              input: {
                borderColor: "#7ba121",
              },
            }}
          >
            <FormLabel fontWeight="900" fontSize="1.2rem">
              Confirm Password
            </FormLabel>
            <InputGroup>
              <Input
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password again"
                borderColor="#663b1e"
                bg="rgba(204, 230, 148, 0.75)"
                _focusVisible={{
                  borderColor: "#7ba121",
                }}
                _placeholder={{ color: "#9e9c70" }}
                onChange={handleConfirmChange}
              />
              <InputRightElement width="4rem">
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
            <FormErrorMessage>{formError.confirm}</FormErrorMessage>
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
            Sign Up
          </Button>
        </form>
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

export default Signup;
