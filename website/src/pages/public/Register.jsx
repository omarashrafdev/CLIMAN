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
} from "@chakra-ui/react";
import { OAuthButtonGroup } from "../../components/OAuthButtonGroup";
import { useState, useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom"

export default function Register() {
  const navigate = useNavigate();

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

  const [err, setErr] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  // Errors vars
  const [firstNameBlankError, setFirstNameBlankError] = useState(false)
  const [lastNameBlankError, setLastNameBlankError] = useState(false)
  const [emailBlankError, setEmailBlankError] = useState(false)
  const [passwordBlankError, setPasswordBlankError] = useState(false)
  const [passwordConfirmBlankError, setPasswordConfirmBlankError] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault();

    // Reset Errors
    setErr("")
    setFirstNameBlankError(false)
    setLastNameBlankError(false)
    setEmailBlankError(false)
    setPasswordBlankError(false)
    setPasswordConfirmBlankError(false)

    if (firstName == "") {
      setFirstNameBlankError(true)
      return
    }
    if (lastName == "") {
      setLastNameBlankError(true)
      return
    }
    if (email == "") {
      setEmailBlankError(true)
      return
    }
    if (password == "") {
      setPasswordBlankError(true)
      return
    }
    if (passwordConfirm == '') {
      setPasswordConfirmBlankError(true)
      return
    }

    // Password validation
    if (!(password === passwordConfirm)) {
      console.log('Stuck')
      setErr('Passwords doesn\'t match')
      return
    }

    await fetch(`http://localhost:8000/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'first_name': firstName,
        'last_name': lastName,
        email,
        password,
        'password2': passwordConfirm
      }),
    }).then(response => {
      if(!response.ok) {
        return response.text().then(text => { throw new Error(text) })
       }
      else {
        navigate("/")
        return
     }    
    }).catch(err => {
      const responseError = JSON.parse((err.message))
      if (responseError.email) {
        if (responseError.email[0] === 'This field must be unique.')
        {
          setErr('Email address already in use.');
          return
        }
        setErr(responseError.email[0]);
        return
      }
      if (responseError.password) {
        setErr(responseError.password[0]);
        return
      }
      if (responseError.password2) {
        setErr(responseError.password2[0]);
        return
      }
      else {
        setErr('Something went wrong!');
      }
    });
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
              Register a new account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Already have an account?</Text>
              <Link href="/login" textColor="blue">
                Sign in
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
                // First Name Input Field
              }
              <FormControl>
                <FormLabel htmlFor="email">First name</FormLabel>
                <Input
                  id="first_name"
                  type="text"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  borderColor={firstNameBlankError ? "red" : "inherit"}
                  required
                />
                {firstNameBlankError && <Text color="red">First name is required</Text>}
              </FormControl>

              {
                // Last Name Input Field
              }
              <FormControl>
                <FormLabel htmlFor="email">Last name</FormLabel>
                <Input
                  id="last_name"
                  type="text"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  borderColor={lastNameBlankError ? "red" : "inherit"}
                  required
                />
                {lastNameBlankError && <Text color="red">Last name is required</Text>}
              </FormControl>

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
                    borderColor={passwordConfirmBlankError ? "red" : "inherit"}
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
            <Stack spacing="6">
              <Button onClick={handleSubmit} type="submit">
                Register
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
