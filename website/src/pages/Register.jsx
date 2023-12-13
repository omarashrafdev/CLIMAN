import {
  Box,
  Button,
  Link,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password2: "",
};

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required."),
  password: Yup.string().required("Password is required."),
  password2: Yup.string().required("Password confirmation is required."),
});

export function Register() {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(registerUser(values));
        setEmail("");
        setPassword("");
        navigate("/login");
      } catch (error) {
        // Handle login error
      }
    },
  });

  const { values, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <Container
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      h="80vh"
      mt={8} // Add margin-top to create space between the navbar and the form
    >
      <Box
        p={8}
        maxW={"400px"}
        w={"full"}
        bg={"white"}
        boxShadow={"md"}
        rounded={"md"}
        textAlign={"center"}
      >
        <Heading color={"blue.400"}>CLIMAN</Heading>
        <Text>Register to CLIMAN</Text>
        <form onSubmit={handleSubmit}>
          <Flex gap={2}>
            <FormControl
              isInvalid={formik.touched.first_name && formik.errors.first_name}
              mb={4}
              size="md"
            >
              <FormLabel>First name</FormLabel>
              <Input
                name="first_name"
                type="text"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                size="md"
              />
              <FormErrorMessage>{formik.errors.first_name}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={formik.touched.last_name && formik.errors.last_name}
              mb={4}
              size="md"
            >
              <FormLabel>Last name</FormLabel>
              <Input
                name="last_name"
                type="text"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                size="md"
              />
              <FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
            </FormControl>
          </Flex>

          <FormControl
            isInvalid={formik.touched.email && formik.errors.email}
            mb={4}
            size="md"
          >
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              size="md"
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={formik.touched.password && formik.errors.password}
            mb={4}
            size="md"
          >
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              size="md"
            />
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={formik.touched.password2 && formik.errors.password2}
            mb={4}
            size="md"
          >
            <FormLabel>Confirm password</FormLabel>
            <Input
              name="password2"
              type="password"
              value={values.password2}
              onChange={handleChange}
              onBlur={handleBlur}
              size="md"
            />
            <FormErrorMessage>{formik.errors.password2}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="md"
            width="full"
            mb={4}
          >
            {"Register"}
          </Button>
        </form>

        <Flex justifyContent="space-between" alignItems="center" mt={4}>
          <Link color={"blue.500"} href="#" textAlign="left">
            Already have an account?
          </Link>
        </Flex>
      </Box>
    </Container>
  );
}
