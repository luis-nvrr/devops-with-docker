import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  Stack,
  chakra,
} from "@chakra-ui/react";
import React from "react";
import { FaGift } from "react-icons/fa";
import useStore from "../hooks/gift";

const CFaGift = chakra(FaGift);

const GiftForm = () => {
  const addGift = useStore((state) => state.addGift);
  const [description, setDescription] = React.useState<string>("");

  const handleAddGift = (event: React.FormEvent) => {
    event.preventDefault();
    addGift(description);
    setDescription("");
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  return (
    <form onSubmit={handleAddGift}>
      <FormControl isRequired>
        <FormLabel>Nuevo regalo:</FormLabel>
        <InputGroup>
          <InputLeftElement children={<CFaGift color="gray.500" />} />
          <Input
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Regalo"
            size="md"
          />
          <Button type="submit" paddingX={6} marginLeft={3} colorScheme="green">
            Pedir!
          </Button>
        </InputGroup>
      </FormControl>
    </form>
  );
};

export default GiftForm;
