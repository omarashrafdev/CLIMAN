import {
  Image,
  Box,
  Button,
  Link,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Center,
} from "@chakra-ui/react";
import { OAuthButtonGroup } from "../../components/OAuthButtonGroup";
import { PasswordField } from "../../components/PasswordField";

export const NewLogin = () => (
  <Container
    maxW="lg"
    py={{
      base: "12",
      md: "24",
    }}
    px={{
      base: "0",
      sm: "8",
    }}
  >
    <Stack spacing="8">
      <Stack spacing="6">
        <Center>
          <Image boxSize="75px" src="./clinic.png" alt="Logo" />
        </Center>
        <Stack
          spacing={{
            base: "2",
            md: "3",
          }}
          textAlign="center"
        >
          <Heading
            size={{
              base: "xl",
            }}
          >
            Log in to your account
          </Heading>
          <HStack spacing="1" justify="center">
            <Text color="muted">Don't have an account?</Text>
            <Link 
                href='/register'
                textColor='blue'
            >
              Sign up
            </Link>
          </HStack>
        </Stack>
      </Stack>
      <Box
        py={{
          base: "0",
          sm: "8",
        }}
        px={{
          base: "4",
          sm: "10",
        }}
        bg={{
          base: "transparent",
          sm: "bg-surface",
        }}
        boxShadow={{
          base: "none",
          sm: "md",
        }}
        borderRadius={{
          base: "none",
          sm: "xl",
        }}
      >
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" />
            </FormControl>
            <PasswordField />
          </Stack>
          <HStack justify="space-between">
            <Checkbox defaultChecked>Remember me</Checkbox>
            <Link 
                href="/forget-password"
                textColor="blue" 
                size="sm"
            >
              Forgot password?
            </Link>
          </HStack>
          <Stack spacing="6">
            <Button>Sign in</Button>
            <HStack>
              <Divider />
              <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                or continue with
              </Text>
              <Divider />
            </HStack>
            <OAuthButtonGroup />
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Container>
);
