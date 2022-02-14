import {
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  Text,
  chakra,
  Center,
  Box,
} from "@chakra-ui/react";
import useStore from "../hooks/gift";
import { FaCandyCane, FaTrashAlt } from "react-icons/fa";

const CFaTrashAlt = chakra(FaTrashAlt);

const GiftList = () => {
  const gifts = useStore((state) => state.gifts);
  const removeGift = useStore((state) => state.removeGift);

  const handleRemoveGift = (event: any) => {
    removeGift(Number(event.target.id));
  };

  return (
    <Box overflow="auto" maxHeight="17em">
      <List marginBottom={6}>
        {gifts.map((gift) => (
          <ListItem key={gift.id}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
            >
              <Stack direction="row" alignItems="center">
                <ListIcon as={FaCandyCane} color="green.500" />
                <Text fontSize="lg" maxWidth="7rem" isTruncated>
                  {gift.description}
                </Text>
              </Stack>
              <Button
                size="sm"
                id={gift.id.toString()}
                backgroundColor="whiteAlpha.900"
                children={<CFaTrashAlt color="red" />}
                onClick={handleRemoveGift}
              />
            </Stack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GiftList;
