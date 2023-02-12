import {
  Image,
  Box,
  Button,
  Link,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  VStack,
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
import { useState, useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = useRef(null)
  const mergeRef = useMergeRefs(inputRef)
  const onClickReveal = () => {
    onToggle()
    if (inputRef.current) {
      inputRef.current.focus({
        preventScroll: true,
      });
    }
  };

  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const [passwordBlankError, setPasswordBlankError] = useState(false)
  const [passwordConfirmBlankError, setPasswordConfirmBlankError] = useState(false)


  const [message, setMessage] = useState({});
  const [email, setEmail] = useState("");

  // Errors vars
  const [emailBlankError, setEmailBlankError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    // Reset Errors
    setMessage((message) => ({}));
    setEmailBlankError(false);

    if (email == "") {
      console.log("email is required");
      setEmailBlankError(true);
      return;
    }

    const response = await fetch(`http://localhost:8000/password-reset/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    if (response.status == 200) {
      setMessage((message) => ({
        title: "We send you an email",
        description: "Please check your email for the reset link",
        type: "success",
      }));
      return;
    } else {
      setMessage((message) => ({
        title: "We couldn't your account",
        description: "Please try a different email address",
        type: "error",
      }));
    }
  }

  async function resetPassword(event) {
    event.preventDefault();

    // Reset Errors
    setPasswordBlankError(false);
    setPasswordConfirmBlankError(false);

    if (password == "") {
      setPasswordBlankError(true);
      return;
    }
    if (passwordConfirm == "") {
      setPasswordConfirmBlankError(true);
      return;
    }
    if (password !== passwordConfirm) {
      setMessage((message) => ({
        title: "Passwords doesn't match",
        type: "error",
      }));
      return;
    }

    const response = await fetch(`http://localhost:8000/password-reset/confirm/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token
      }),
    });
    if (response.status == 200) {
      navigate("/")
      return
    } else {
      setMessage((message) => ({
        'title': "The token is not valid",
        'type': "error",
      }));
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
      {token ? ( 
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
                Reset Your password
              </Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">
                  Enter the new password for your account.
                </Text>
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
              {message.title && (
                <Alert status={message.type}>
                  <AlertIcon />
                  <VStack align="left">
                    <AlertTitle>{message.title}</AlertTitle>
                  </VStack>
                </Alert>
              )}
              <Stack spacing="5">
                {
                  // Password Input Field
                }
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <InputRightElement>
                      <IconButton
                        variant="link"
                        aria-label={
                          isOpen ? "Mask password" : "Reveal password"
                        }
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

                {
                  // Confirm Password Input Field
                }
                <FormControl>
                  <FormLabel htmlFor="password">Confirm password</FormLabel>
                  <InputGroup>
                    <Input
                      id="password2"
                      ref={mergeRef}
                      name="password"
                      onChange={(e) => {
                        setPasswordConfirm(e.target.value);
                      }}
                      type={isOpen ? "text" : "password"}
                      borderColor={
                        passwordConfirmBlankError ? "red" : "inherit"
                      }
                      autoComplete="current-password"
                      required
                    />
                  </InputGroup>
                  {passwordConfirmBlankError && (
                    <Text color="red">Password confirm is required</Text>
                  )}
                </FormControl>
              </Stack>

              {
                // Sign in options
              }
              <Stack spacing="3">
                <Button onClick={resetPassword} type="submit">
                  Reset password
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      ) : (
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
                Trouble logging in?
              </Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">
                  Enter your email and we'll send you a link to get back into
                  your account.
                </Text>
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
              {message.title && (
                <Alert status={message.type}>
                  <AlertIcon />
                  <VStack align="left">
                    <AlertTitle>{message.title}</AlertTitle>
                    <AlertDescription>{message.description}</AlertDescription>
                  </VStack>
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
                  {emailBlankError && (
                    <Text color="red">Email is required</Text>
                  )}
                </FormControl>
              </Stack>

              {
                // Sign in options
              }
              <Stack spacing="3">
                <Button onClick={handleSubmit} type="submit">
                  Send reset link
                </Button>
                <HStack spacing="3">
                  <Divider />
                  <Text fontSize="lg" whiteSpace="nowrap" color="muted">
                    or
                  </Text>
                  <Divider />
                </HStack>
                <Center>
                  <Link href="/register" textColor="blue">
                    Create new account
                  </Link>
                </Center>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      )}
    </Container>
  );
}
