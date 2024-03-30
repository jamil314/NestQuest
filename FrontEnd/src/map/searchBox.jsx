import { useEffect, useState } from "react";
import { Input, VStack, HStack, Button } from "@chakra-ui/react";
import { searchLocation } from "../api";

const SearchBox = ({ flyTo }) => {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchLocation = async (query) => {
      if (!query) setPlaces([]);
      else {
        try {
          const { data } = await searchLocation(query);
          setPlaces(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchLocation(query);
  }, [query]);

  return (
    <VStack alignItems="flex-start" bg="white" spacing={0}>
      <HStack width="50vw" spacing={0} borderRadius={4}>
        <Input
          bg="aliceblue"
          value={query}
          placeholder="Search for places"
          onChange={(e) => setQuery(e.target.value)}
        ></Input>
        <Button onClick={() => setQuery("")}>Clear</Button>
      </HStack>
      {places.map((place, id) => {
        return (
          <Button
            overflow="clip"
            key={id}
            border="1px solid gray"
            borderRadius={4}
            w="100%"
            maxW="50vw"
            onClick={() => {
              flyTo([place.lat, place.lon]);
            }}
            justifyContent="start"
          >
            {place.display_name}
          </Button>
        );
      })}
    </VStack>
  );
};

export default SearchBox;
