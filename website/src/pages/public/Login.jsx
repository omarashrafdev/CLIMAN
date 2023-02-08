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
  IconButton,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { OAuthButtonGroup } from "../../components/OAuthButtonGroup";
import { useState, forwardRef, useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate();

  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef(null);
  const mergeRef = useMergeRefs(inputRef);
  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({
        preventScroll: true,
      });
    }
  };

  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Errors vars
  const [emailBlankError, setEmailBlankError] = useState(false);
  const [passwordBlankError, setPasswordBlankError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    // Reset Errors
    setErr("");
    setEmailBlankError(false);
    setPasswordBlankError(false);

    if (email == "") {
      console.log("email is required");
      setEmailBlankError(true);
      return;
    }
    if (password == "") {
      setPasswordBlankError(true);
      return;
    }

    const response = await fetch(`http://localhost:8000/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.status == 200) {
      // TODO: Redirect to home page
      navigate("/");
      return
    }
    else {
      setErr("Invalid email or password");
    }
  }

  return (
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
              <Link href="/register" textColor="blue">
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
            {err && (
              <Alert status="error" textAlign="center">
                <AlertIcon />
                <AlertTitle>{err}</AlertTitle>
              </Alert>
            )}
            <Stack spacing="5">
              {
                // Email Input Field
              }
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  borderColor={emailBlankError ? "red" : "inherit"}
                  required
                />
                {emailBlankError && <Text color="red">Email is required</Text>}
              </FormControl>

              {
                // Password Input Field
              }
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <InputRightElement>
                    <IconButton
                      variant="link"
                      aria-label={isOpen ? "Mask password" : "Reveal password"}
                      icon={isOpen ? <HiEyeOff /> : <HiEye />}
                      onClick={onClickReveal}
                    />
                  </InputRightElement>
                  <Input
                    id="password"
                    ref={mergeRef}
                    name="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type={isOpen ? "text" : "password"}
                    borderColor={passwordBlankError ? "red" : "inherit"}
                    autoComplete="current-password"
                    required
                  />
                </InputGroup>
                {passwordBlankError && (
                  <Text color="red">Password is required</Text>
                )}
              </FormControl>
            </Stack>

            {
              // Remember me option + Forget password redirect
            }
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Link href="/forget-password" textColor="blue" size="sm">
                Forgot password?
              </Link>
            </HStack>

            {
              // Sign in options
            }
            <Stack spacing="6">
              <Button onClick={handleSubmit} type="submit">
                Sign In
              </Button>
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
}
