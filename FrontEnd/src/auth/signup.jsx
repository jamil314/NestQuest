import { FormControl, FormLabel, Input, Button, Heading, Box ,InputGroup, InputRightElement, IconButton} from '@chakra-ui/react'
import { EditIcon , ViewOffIcon, ViewIcon} from '@chakra-ui/icons'
import { useState } from 'react';

const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="md" bg={'white'}>
        <Heading as="h1" size="lg" mb={4} textAlign="center">
        <EditIcon mr={'0.5rem'}/> Sign Up
      </Heading>
    <form onSubmit={e => {e.preventDefault(); console.log(e)}}>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input type="email" placeholder="Enter your email"  />
      </FormControl>

      <FormControl id="password" mt={4} isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            pr="4.5rem"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            
          />
          <InputRightElement width="4.5rem">
            <IconButton
              h="1.75rem"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirmPassword" mt={4} isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            pr="4.5rem"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password again"
            
          />
          <InputRightElement width="4.5rem">
            <IconButton
              h="1.75rem"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button mt={4} colorScheme="blue" type="submit" width="100%">
        Sign Up
      </Button>
    </form>
  </Box>
  )
}

export default Signup