import { useState } from "react";
import { Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import api from "./services/api";

function App() {
  const toast = useToast();
  const [textBox, SettextBox] = useState(false);
  const [link, Setlink] = useState("");
  const [boxVisibility, SetboxVisibility] = useState(false);

  const onSubmit = (link: string) => {
    if (!link) {
      toast({
        title: "Faltou o link",
        description: "Cole o link no campo de busca!",
        status: "warning",
      });
      return;
    }
    console.log(boxVisibility);
    SetboxVisibility(!boxVisibility);
    console.log(link);

    // api
    //   .post(
    //     "/task",
    //     {
    //       description: task,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    //   .then((res) => loadTasks());
  };

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
            onChange={(e) => Setlink(e.target.value)}
          />
          <Button colorScheme="teal" size="md" onClick={() => onSubmit(link)}>
            Enviar
          </Button>
        </Box>
        {boxVisibility ? (
          <Box
            mt="100px"
            p="12px"
            borderRadius="10px"
            bgColor="white"
            w="50%"
            h="50%"
          ></Box>
        ) : (
          ""
        )}
      </Box>
    </>
  );
}

export default App;
