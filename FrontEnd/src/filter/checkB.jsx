import { Checkbox } from "@chakra-ui/react";
import { useFilterStore } from "../store/nest";
import { useState } from "react";

const CheckB = ({ label }) => {
  const getValue = useFilterStore((state) => state.getValue);
  const setValue = useFilterStore((state) => state.setValue);
  const [val, setVal] = useState(getValue(label));
  const handleChange = () => {
    const value = !val;
    setVal(value);
    setValue(label, value);
  };
  return (
    <Checkbox checked={val} onChange={handleChange}>
      {label + " required?"}{" "}
    </Checkbox>
  );
};

export default CheckB;
