import {
  Container,
  Image,
  Stack,
  Box,
  Text,
  Flex,
  IconButton,
  Link,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa"; // Import social icons

export function Home() {
  return (
    <Container>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
      >
        <Box
          bgColor={"blue.700"}
          w={"100vw"}
          minH={"50vh"}
          py={20}
          color="white"
        >
          <Flex direction={{ base: "column", md: "row" }} align="center">
            {/* Left side with logo and description */}
            <Flex direction="column" flex="1" px={8}>
              <Box maxH="200px" mb={6}>
                <Image
                  src="/logo-text.png"
                  boxSize="100%"
                  objectFit="contain"
                />
              </Box>
              <Text mb={8}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                sit amet massa non mauris malesuada bibendum ut non eros.
                Curabitur mollis leo nisi, eget sagittis dui varius sit amet.
                Praesent volutpat auctor magna.
              </Text>
              {/* Social icons with external links */}
              <Stack direction="row" spacing={4}>
                <Link href="#" isExternal>
                  <IconButton icon={<FaYoutube />} colorScheme="white" />
                </Link>
                <Link href="#" isExternal>
                  <IconButton icon={<FaFacebook />} colorScheme="white" />
                </Link>
                <Link href="#" isExternal>
                  <IconButton icon={<FaLinkedinIn />} colorScheme="white" />
                </Link>
              </Stack>
            </Flex>

            {/* Right side with doctor image */}
            <Image
              src="https://source.unsplash.com/400x600/?doctor"
              boxSize={{ base: "100%", md: "400px" }}
            />
          </Flex>
        </Box>
      </Stack>
    </Container>
  );
}
