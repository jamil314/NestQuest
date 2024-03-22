import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  InputGroup,
  InputRightElement,
  IconButton,
  Image,
  HStack,
  Center,
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";

import signup from "../assets/nest-signup.png";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      w={"calc(var(--fs-1) * 20)"}
      // maxW="md"
      mx="auto"
      p={"var(--fs-3)"}
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
        <HStack fontSize={"var(--fs-2)"} fontWeight={"bold"}>
          <Image src={signup} h={"var(--fs-3)"} />
          <h1>Sign Up</h1>
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
          <FormLabel fontWeight="900" fontSize="var(--fs-1)">
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
          <FormLabel fontWeight="900" fontSize="var(--fs-1)">
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
        </FormControl>

        <FormControl
          id="confirmPassword"
          mt={4}
          isRequired
          _hover={{
            input: {
              borderColor: "#7ba121",
            },
          }}
        >
          <FormLabel fontWeight="900" fontSize="var(--fs-1)">
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
  );
};

export default Signup;
