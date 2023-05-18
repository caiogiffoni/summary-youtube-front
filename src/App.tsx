import { useState } from "react";
import { Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";

function App() {
  const [textBox, SettextBox] = useState("False");

  return (
    <>
      <Box
        w="100vw"
        h="100vh"
        bgColor="#e1ecd6"
        display="flex"
        flexDirection="column"
        alignItems="center"
        pt="100px"
      >
        <Text fontSize="4xl" color="#16c1c8">
          Youtube Summarizer
        </Text>
        <Text fontSize="md" color="#16c1c8" p="20px 0px 30px 0px">
          Cole o link do video do Youtube no campo abaixo para obter o resumo
        </Text>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="15px"
          w="60%"
        >
          <Input
            borderColor="#7cd7cf"
            placeholder="Cole seu link do youtube aqui"
            size="md"
          />
          <Button colorScheme="teal" size="md">
            Enviar
          </Button>
        </Box>
        <Box
          mt="100px"
          p="12px"
          borderRadius="10px"
          bgColor="white"
          w="50%"
          h="50%"
        ></Box>
      </Box>
    </>
  );
}

export default App;
