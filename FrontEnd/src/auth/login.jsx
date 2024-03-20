import { FormControl, FormLabel, Input, Button, Heading, Box ,InputGroup, InputRightElement, IconButton, Link} from '@chakra-ui/react'
import { UnlockIcon , ViewOffIcon, ViewIcon} from '@chakra-ui/icons'
import { useState } from 'react';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="md" bg={'white'}>
        <Heading as="h1" size="lg" mb={4} textAlign="center">
        <UnlockIcon mr={'0.5rem'}/> Log In
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

      <Button mt={4} colorScheme="blue" type="submit" width="100%">
        Login
      </Button>
    </form>

    <Box mt={4} textAlign="right">
      <Link color="blue.500" href="#" fontSize="sm">
        Forgot Password?
      </Link>
    </Box>
  </Box>
  )
}

export default Login