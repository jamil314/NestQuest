import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
} from "@chakra-ui/react";
import RangePicker from "./rangePicker";
import CheckB from "./checkB";
const FilterFiled = () => {
  return (
    <Accordion allowToggle w={400}>
      <AccordionItem>
        <h3>
          <AccordionButton
            _expanded={{ bg: "gray", color: "white" }}
            bg="aliceblue"
          >
            <Box as="span" flex="1" textAlign="left">
              Layout
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h3>
        <AccordionPanel>
          <RangePicker label="Bedroom" />
          <RangePicker label="Bathroom" />
          <RangePicker label="Rent" />
          <RangePicker label="Area" />
          <RangePicker label="Floor" />
          <CheckB label="Bachelor" />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h3>
          <AccordionButton
            _expanded={{ bg: "gray", color: "white" }}
            bg="aliceblue"
          >
            <Box as="span" flex="1" textAlign="left">
              UTilities & amenities
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h3>
        <AccordionPanel>
          <VStack alignItems="start">
            <CheckB label="Lift" />
            <CheckB label="Furnished" />
            <CheckB label="Ac" />
            <CheckB label="Fridge" />
            <CheckB label="Heater" />
            <CheckB label="Geyser" />
          </VStack>
        </AccordionPanel>
      </AccordionItem>
      {/* <AccordionItem>
        <h3>
          <AccordionButton
            _expanded={{ bg: "gray", color: "white" }}
            bg="aliceblue"
          >
            <Box as="span" flex="1" textAlign="left">
              Restrictions
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h3>
        <AccordionPanel>
          <VStack alignItems="start">
            <CheckB label="Allow_Cat" />
            <CheckB label="Allow_Dog" />
          </VStack>
        </AccordionPanel>
      </AccordionItem> */}
    </Accordion>
  );
};

export default FilterFiled;
