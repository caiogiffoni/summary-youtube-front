import { useState } from "react";
import { Stack, Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import api from "./services/api";
import { Skeleton } from "@chakra-ui/react";

function App() {
  const toast = useToast();
  const [link, Setlink] = useState("");
  const [boxVisibility, SetboxVisibility] = useState(false);
  const [summary, Setsummary] = useState<string>("");

  const onSubmit = (link: string) => {
    if (!link) {
      toast({
        title: "Faltou o link",
        description: "Favor colar o link no campo de busca!",
        status: "warning",
      });
      return;
    }
    if (
      // eslint-disable-next-line no-useless-escape
      !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
        link
      )
    ) {
      toast({
        title: "Link inválido",
        description: "Favor colar um link válido no campo de busca!",
        status: "warning",
      });
      return;
    }
    Setsummary("");
    SetboxVisibility(true);
    api
      .post(
        "/summarize",
        {
          link,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN_HASH}`,
          },
          timeout: 60 * 7 * 1000,
        }
      )
      .then((res) => Setsummary(res.data["summary"]))
      .catch(() => {
        toast({
          title: "Sistema sobrecarregado",
          description: "Muitas requisições seguidas! Tente mais tarde.",
          status: "warning",
        });
        SetboxVisibility(false);
      });
  };

  return (
    <>
      <Box
        w="100vw"
        minH="100vh"
        bgColor="#e7e7df"
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={["30px 0px 60px 0px", "60px 0px 1000px 0px", "80px 0px 140px 0px"]}
      >
        <Text fontSize={["xl", "2xl", "4xl"]} color="#318510">
          Youtube Summarizer
        </Text>
        <Text
          fontSize={["sm", "sm", "md"]}
          color="#318510"
          p={["20px 20px 15px 20px", "20px 10px 30px 15px"]}
        >
          Cole o link do video do Youtube no campo abaixo para obter o resumo
        </Text>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection={["column", "row"]}
          alignItems="center"
          gap="15px"
          w={["80%", "70%", "60%"]}
        >
          <Input
            borderColor="#318510"
            placeholder="Cole seu link do youtube aqui"
            size={["sm", "sm", "md"]}
            onChange={(e) => Setlink(e.target.value)}
          />
          <Button
            // colorScheme="teal"
            color="white"
            bgColor="#318510"
            size={["sm", "sm", "md"]}
            onClick={() => onSubmit(link)}
          >
            Enviar
          </Button>
        </Box>
        {boxVisibility ? (
          <Box
            mt="100px"
            p={["20px 20px 30px 20px", "35px 35px 60px 35px"]}
            borderRadius="10px"
            bgColor="white"
            w={["80%", "60%"]}
            minH="200px"
          >
            {summary ? (
              <Text>{summary}</Text>
            ) : (
              <Stack>
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </Stack>
            )}
          </Box>
        ) : (
          ""
        )}
      </Box>
    </>
  );
}

export default App;
