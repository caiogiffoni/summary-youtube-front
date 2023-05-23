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
  const [summary, Setsummary] = useState("");

  const onSubmit = (link: string) => {
    // if (!link) {
    //   toast({
    //     title: "Faltou o link",
    //     description: "Favor colar o link no campo de busca!",
    //     status: "warning",
    //   });
    //   return;
    // }
    // if (
    //   // eslint-disable-next-line no-useless-escape
    //   !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
    //     link
    //   )
    // ) {
    //   toast({
    //     title: "Link inválido",
    //     description: "Favor colar um link válido no campo de busca!",
    //     status: "warning",
    //   });
    //   return;
    // }
    SetboxVisibility(true);
    console.log("oi");
    console.log(process.env.REACT_APP_NAME);
    console.log(import.meta.env.VITE_HI);
    api
      .post(
        "/summarize",
        {
          link,
        },
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        }
      )
      .then((res) => Setsummary(res.data[0]))
      .catch((e) => {
        toast({
          title: "Link inválido",
          description: "Favor verificar o link inserido!",
          status: "warning",
        });
      });
  };

  return (
    <>
      <Box
        w="100vw"
        minH="100vh"
        bgColor="#e1ecd6"
        display="flex"
        flexDirection="column"
        alignItems="center"
        p="80px 0px 140px 0px"
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
            p="15px 15px 40px 15px"
            borderRadius="10px"
            bgColor="white"
            w="60%"
            minH="200px"
          >
            <Text>{summary}</Text>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </>
  );
}

export default App;
