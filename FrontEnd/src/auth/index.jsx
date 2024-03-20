import Login from "./login"
import Signup from "./signup"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


const Auth = () => {
  return (
    <div>
      <Tabs isFitted variant={'enclosed'}>
        <TabList>
          <Tab>Log in</Tab>
          <Tab>Sign up</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <Signup />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default Auth