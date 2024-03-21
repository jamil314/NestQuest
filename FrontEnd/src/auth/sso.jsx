import { VStack } from "@chakra-ui/react";

import SSOItem from "./ssoitem";
import fbIcon from "../assets/facebook.png";
import googleIcon from "../assets/google.png";
// import ghIcon from "../assets/github.png";
import guest from "../assets/bird-guest.png";
const SSO = () => {
  return (
    <VStack>
      <SSOItem icon={fbIcon} title={"Continue with Facebook"} />;
      <SSOItem icon={googleIcon} title={"Continue with Google"} />;
      {/* <SSOItem icon={ghIcon} title={"Continue with Github"} />; */}
      <SSOItem icon={guest} title={"Continue as guest"} />;
    </VStack>
  );
};

export default SSO;
