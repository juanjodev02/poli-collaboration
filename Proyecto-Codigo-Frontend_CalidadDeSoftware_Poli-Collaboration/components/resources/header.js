import React from "react";
import { Heading, Flex, Image } from "@chakra-ui/react";
    
const Header = (props) => {
  return (
    <Flex
      justify="space-between"
      justifyContent = "center"
      height="7vh"
      py={2}
      bg="blue.700"
      color="white"
      pos="fixed"
      w="100%"
      {...props}
    >
        <Heading as="h1" size="lg" letterSpacing={"wider"}>
        <Image height="100%" src="https://i.imgur.com/A6FaAt3.png" alt="logoPoliCollaboration"/>
        </Heading>
    </Flex>
  );
};

export default Header;