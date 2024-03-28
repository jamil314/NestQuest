import React, { useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
} from "@chakra-ui/react";
import { IoPersonCircle } from "react-icons/io5";
import { HiFilter } from "react-icons/hi";

const FloatingIcon = ({ firstName, lastName }) => {
  const [isOpen, setIsOpen] = useState([false, false]);

  // Function to get initials
  const getInitials = () => {
    return `JR`;
    // return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <HStack position="fixed" top="4" right="4" zIndex="999">
      <Box shadow="md">
        <Menu isOpen={isOpen[0]}>
          <MenuButton
            size={60}
            as={IconButton}
            aria-label="Options"
            //   icon={getInitials()}
            icon={<HiFilter size={60} shadow="md" />}
            onClick={() => setIsOpen(isOpen[0] ? [0, 0] : [1, 0])}
          />
          <MenuList>
            <MenuItem onClick={() => console.log("Visit Profile")}>
              Visit Profile
            </MenuItem>
            <MenuItem onClick={() => console.log("Add House")}>
              Add House
            </MenuItem>
            <MenuItem onClick={() => console.log("Owned Houses")}>
              Owned Houses
            </MenuItem>
            <MenuItem onClick={() => console.log("Bookmarked Houses")}>
              Bookmarked Houses
            </MenuItem>
            <MenuItem onClick={() => console.log("Log out")} dir="rtl">
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Box shadow="md">
        <Menu isOpen={isOpen[1]}>
          <MenuButton
            size={60}
            as={IconButton}
            aria-label="Options"
            icon={<IoPersonCircle size={60} shadow="md" />}
            onClick={() => setIsOpen(isOpen[1] ? [0, 0] : [0, 1])}
          />
          <MenuList>
            <MenuItem onClick={() => console.log("Visit Profile")}>
              Visit Profile
            </MenuItem>
            <MenuItem onClick={() => console.log("Add House")}>
              Add House
            </MenuItem>
            <MenuItem onClick={() => console.log("Owned Houses")}>
              Owned Houses
            </MenuItem>
            <MenuItem onClick={() => console.log("Bookmarked Houses")}>
              Bookmarked Houses
            </MenuItem>
            <MenuItem onClick={() => console.log("Log out")} dir="rtl">
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </HStack>
  );
};

export default FloatingIcon;
