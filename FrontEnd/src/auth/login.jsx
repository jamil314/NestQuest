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
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { useState } from "react";

import loginIcon from "../assets/birdhouse-login.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
        }}
      >
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
            type="email"
            placeholder="Enter your email"
            borderColor="#663b1e"
            bg="rgba(204, 230, 148, 0.75)"
            _focusVisible={{
              borderColor: "#7ba121",
            }}
            _placeholder={{ color: "#9e9c70" }}
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
  );
};

export default Login;
