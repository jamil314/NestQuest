import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  HStack,
  Text,
  Input,
} from "@chakra-ui/react";
import { CgEditBlackPoint } from "react-icons/cg";
import { useFilterStore } from "../store/nest";
import { useState } from "react";

const config = {
  Bedroom: [1, 10, 1],
  Bathroom: [1, 10, 1],
  Rent: [0, 500000, 500],
  Area: [0, 10000, 100],
  Floor: [1, 50, 1],
};

const RangePicker = ({ label }) => {
  const getValue = useFilterStore((state) => state.getValue);
  const setValue = useFilterStore((state) => state.setValue);
  const [range, setRange] = useState(getValue(label));
  const handleChange = (value) => {
    setRange(value);
    setValue(label, value);
  };
  return (
    <HStack pr={4}>
      <HStack w={label === "Rent" || label === "Area" ? "250px" : "170px"}>
        <Text>{label} </Text>
        <Input
          p={1}
          type="number"
          value={range[0]}
          onChange={(e) =>
            handleChange([Math.min(Number(e.target.value), range[1]), range[1]])
          }
        />
        <Text>-</Text>
        <Input
          p={1}
          type="number"
          value={range[1]}
          onChange={(e) =>
            handleChange([range[0], Math.max(Number(e.target.value), range[0])])
          }
        />
      </HStack>
      <RangeSlider
        min={config[label][0]}
        max={config[label][1]}
        step={config[label][2]}
        // max={config[label][1]}
        aria-label={["min", "max"]}
        value={range}
        onChange={handleChange}
        w="calc(100% - 150px)"
      >
        <RangeSliderTrack bg="gray">
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} color="blue" as={CgEditBlackPoint} />
        <RangeSliderThumb index={1} color="blue" as={CgEditBlackPoint} />
      </RangeSlider>
    </HStack>
  );
};

export default RangePicker;
