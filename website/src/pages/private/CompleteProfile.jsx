import {
  Image,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Center,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  useMergeRefs,
  Alert,
  AlertIcon,
  AlertTitle,
  Select,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Flag from "react-world-flags";
import AuthContext from "../../context/AuthContext";

export default function CompleteProfile() {
  const navigate = useNavigate();

  const CITIES = [
    'Alexandria',
    "Aswan",
    "Asyut",
    "Beheira",
    "Beni Suef",
    "Cairo",
    "Dakahlia",
    "Damietta",
    "Faiyum",
    "Gharbia",
    "Giza",
    "Ismailia",
    "Kafr El Sheikh",
    "Luxor",
    "Matruh",
    "Minya",
    "Monufia",
    "New Valley",
    "North Sinai",
    "Port Said",
    "Qalyubia ",
    "Qena",
    "Red Sea",
    "Sharqia",
    "Sohag",
    "South Sinai",
    "Suez"
  ]

  const {user} = useContext(AuthContext)

  const [err, setErr] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  // Errors vars
  const [phoneNumberBlankError, setPhoneNumberBlankError] = useState(false);
  const [dateOfBirthBlankError, setDateOfBirthBlankError] = useState(false);
  const [genderBlankError, setGenderBlankError] = useState(false);
  const [cityBlankError, setCityBlankError] = useState(false);
  const [addressBlankError, setAddressBlankError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    // Reset Errors
    setErr("");
    setPhoneNumberBlankError(false);
    setDateOfBirthBlankError(false);
    setGenderBlankError(false);
    setCityBlankError(false);
    setAddressBlankError(false);

    if (phoneNumber == "") {
      setPhoneNumberBlankError(true);
      return;
    }
    if (dateOfBirth == "") {
      setDateOfBirthBlankError(true);
      return;
    }
    if (gender == "") {
      setGenderBlankError(true);
      return;
    }
    if (city == "") {
      setCityBlankError(true);
      return;
    }
    if (address == "") {
      setAddressBlankError(true);
      return;
    }

    if (phoneNumber.length == 10) {
      let phonePrefix = phoneNumber[0]+phoneNumber[1]
      if (phonePrefix == '10' || phonePrefix == '11' || phonePrefix == '12' || phonePrefix == '15') {
        setPhoneNumber('0' + phoneNumber)
      }
      else {
        setErr("Invalid phone number");
        return
      }
    }
    else if (phoneNumber.length == 11) {
      let phonePrefix = phoneNumber[0] + phoneNumber[1] + phoneNumber[2]
      if (phonePrefix == '010' || phonePrefix == '011' || phonePrefix == '012' || phonePrefix == '015') {}
      else {
        setErr("Invalid phone number");
        return
      }
    }
    else {
      setErr("Invalid phone number");
      return
    }

    // TODO: Pass user id
    const response = await fetch(`http://localhost:8000/user/${user.user_id}/add-information`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        'phone': phoneNumber,
        'birthdate': dateOfBirth,
        'gender': gender,
        'city': city,
        'address': address,
      }),
    })
    if (response.status == 200) {
      navigate("/");
      return
    }
    else {
      setErr("Something went wrong!");
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
              Complete your profile
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">
                You can choose who can view these information on your profile settings
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
            {err && (
              <Alert status="error" textAlign="center">
                <AlertIcon />
                <AlertTitle>{err}</AlertTitle>
              </Alert>
            )}
            <Stack spacing="5">
              {
                // Phone Number Input Field
              }
              <FormControl>
                <FormLabel htmlFor="phone_number">Phone number</FormLabel>
                <InputGroup>
                  <InputLeftElement width='50px'>
                    <HStack spacing='2'>
                      <Flag height="1rem" code="818" />
                      <Text>+20</Text>
                    </HStack>
                  </InputLeftElement>
                  <Input
                    id="phone_number"
                    type="number"
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                    borderColor={phoneNumberBlankError ? "red" : "inherit"}
                    required
                    paddingLeft='80px'
                  />
                </InputGroup>
                {phoneNumberBlankError && (
                  <Text color="red">Phone number is required</Text>
                )}
              </FormControl>

              {
                // Date of birth Input Field
              }
              <FormControl>
                <FormLabel htmlFor="date_of_birth">Date of birth</FormLabel>
                <Input
                  id="date_of_birth"
                  type="date"
                  onChange={(e) => {
                    setDateOfBirth(e.target.value);
                  }}
                  borderColor={dateOfBirthBlankError ? "red" : "inherit"}
                  required
                />
                {dateOfBirthBlankError && (
                  <Text color="red">Date of birth is required</Text>
                )}
              </FormControl>

              {
                // Gender Input Field
              }
              <FormControl>
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <Select
                  id="gender"
                  onChange={(e) => {
                    setGender(e.target.value)
                  }}
                  borderColor={genderBlankError ? "red" : "inherit"}
                  defaultValue=''
                  required
                >
                  <option value='' disabled>Choose your gender</option>
                  <option value='M'>Male</option>
                  <option value='F'>Female</option>
                </Select>
                {genderBlankError && (
                  <Text color="red">Gender selection is required</Text>
                )}
              </FormControl>

              {
                // City Input Field
              }
              <FormControl>
                <FormLabel htmlFor="city">City</FormLabel>
                <Select
                  id="city"
                  onChange={(e) => {
                    setCity(e.target.value)
                  }}
                  borderColor={cityBlankError ? "red" : "inherit"}
                  defaultValue=''
                  required
                >
                  <option value='' disabled>Choose your city</option>
                  {CITIES.map(city => (
                    <option value={city} key={city}>{city}</option>
                  ))}
                </Select>
                {cityBlankError && (
                  <Text color="red">City selection is required</Text>
                )}
              </FormControl>

              {
                // Address Input Field
              }
              <FormControl>
                <FormLabel htmlFor="address">Address</FormLabel>
                  <Input
                    id="address"
                    name="password"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    type="text"
                    borderColor={addressBlankError ? "red" : "inherit"}
                    required
                  />
                {addressBlankError && (
                  <Text color="red">Address is required</Text>
                )}
              </FormControl>
            </Stack>

            {
              // Sign in options
            }
            <Stack spacing="6">
              <Button onClick={handleSubmit} type="submit">
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
