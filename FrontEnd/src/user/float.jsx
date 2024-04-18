import { useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
// import { IoPersonCircle } from "react-icons/io5";
import { HiFilter } from "react-icons/hi";
import { FaEarlybirds } from "react-icons/fa";
import FilterFiled from "../filter/filter";
import { useFilterStore } from "../store/nest";

const FloatingIcon = () => {
  const [isOpen, setIsOpen] = useState([false, false]);

  const getInitial = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user.username.substr(0, 2).toUpperCase();
  };

  const clearValue = useFilterStore((state) => state.clearValue);

  return (
    <HStack position="fixed" top="4" right="4" zIndex="999">
      <Box shadow="md">
        <Menu isOpen={isOpen[0]}>
          <MenuButton
            size={40}
            as={IconButton}
            aria-label="Options"
            //   icon={getInitials()}
            icon={<HiFilter size={40} shadow="md" />}
            onClick={() => setIsOpen(isOpen[0] ? [0, 0] : [1, 0])}
          />
          <MenuList>
            <Accordion allowToggle w={400}>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "black", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Filter
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <FilterFiled />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "black", color: "white" }}>
                    <Box as="span" flex="1" textAlign="left">
                      Sort
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <FilterFiled />
                </AccordionPanel>
              </AccordionItem>
              <MenuItem
                Visit
                Profile
                justifyContent="center"
                type="button"
                bg="blue.400"
                color="white"
                onClick={() => setIsOpen([0, 0])}
              >
                Apply filter and sort
              </MenuItem>
              <MenuItem
                Visit
                Profile
                justifyContent="center"
                type="button"
                color="blue.400"
                onClick={() => {
                  clearValue();
                  setIsOpen([0, 0]);
                }}
              >
                Clear filters
              </MenuItem>
            </Accordion>
          </MenuList>
        </Menu>
      </Box>
      <Box shadow="md">
        <Menu isOpen={isOpen[1]}>
          <MenuButton
            size={40}
            as={IconButton}
            aria-label="Options"
            icon={
              localStorage.getItem("user") ? (
                <Text fontSize={20} p={2}>
                  {getInitial()}
                </Text>
              ) : (
                <FaEarlybirds size={40} shadow="md" />
              )
            }
            onClick={() => setIsOpen(isOpen[1] ? [0, 0] : [0, 1])}
          />
          {localStorage.getItem("user") ? (
            <MenuList>
              <MenuItem onClick={() => console.log("Visit Profile")}>
                Visit Profile
              </MenuItem>
              <MenuItem onClick={() => (window.location.href = "/new")}>
                Add House
              </MenuItem>
              <MenuItem onClick={() => console.log("Owned Houses")}>
                Owned Houses
              </MenuItem>
              <MenuItem onClick={() => console.log("Bookmarked Houses")}>
                Bookmarked Houses
              </MenuItem>
              <MenuItem
                color="red"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.href = "/auth";
                }}
                dir="rtl"
              >
                Log out
              </MenuItem>
            </MenuList>
          ) : (
            <MenuList>
              <MenuItem onClick={() => (window.location.href = "/auth")}>
                Login or Sign Up
              </MenuItem>
            </MenuList>
          )}
        </Menu>
      </Box>
    </HStack>
  );
};

export default FloatingIcon;
