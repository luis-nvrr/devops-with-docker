import React from "react";
import {
  Flex,
  Stack,
  Box,
  Heading,
  Divider,
  Center,
  Button,
  Text,
} from "@chakra-ui/react";
import GiftForm from "../features/gifts/components/GiftForm";
import GiftList from "../features/gifts/components/GiftList";
import useStore from "../features/gifts/hooks/gift";
import pattern from "../assets/pattern.jpg";

const HomeScreen = () => {
  const fetchAll = useStore((state) => state.fetchAll);
  const gifts = useStore((state) => state.gifts);
  const removeAll = useStore((state) => state.removeAll);

  React.useEffect(() => {
    fetchAll();
  }, []);

  const handleRemoveAll = (event: any) => {
    removeAll();
  };
  return (
    <Flex
      direction="column"
      width="100wh"
      height="100vh"
      bgGradient="radial-gradient(circle, rgba(243,189,86,1) 0%, rgba(245,138,35,1) 33%, rgba(255,174,48,1) 100%);"
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        backgroundImage={`url(${pattern})`}
        paddingX="10%"
        paddingY="3%"
        borderRadius="xl"
        boxShadow="sm"
      >
        <Box
          background="whiteAlpha.900"
          padding={6}
          borderRadius="xl"
          boxShadow="md"
        >
          <Stack spacing={3}>
            <Heading>Regalos:</Heading>
            <GiftForm />
            <Divider />
            <Box height="20rem" width="19rem" padding={3}>
              <GiftList />
              <Center>
                {gifts.length > 0 ? (
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={handleRemoveAll}
                    marginTop={3}
                  >
                    Borrar Todo
                  </Button>
                ) : (
                  <Text>No hay regalos para mostrar!</Text>
                )}
              </Center>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default HomeScreen;
