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
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required.'),
  password: Yup.string().required('Password is required.'),
});

export function Login() {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(loginUser(values));
        setEmail('');
        setPassword('');
        navigate('/');
      } catch (error) {
        // Handle login error
      }
    },
  });

  const { values, handleBlur, handleChange, handleSubmit } = formik;


  return (
    <Container
      display={'flex'}
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      h="80vh"
    >
      <Box
        p={8}
        maxW={'400px'}
        w={'full'}
        bg={'white'}
        boxShadow={'md'}
        rounded={'md'}
        textAlign={'center'}
      >
        <Heading color={'blue.400'}>CLIMAN</Heading>
        <Text>Login to continue</Text>
        <form onSubmit={handleSubmit}>
          <FormControl isInvalid={formik.touched.email && formik.errors.email} mb={4} size="md">
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

          <FormControl isInvalid={formik.touched.password && formik.errors.password} mb={4} size="md">
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

          <Button type="submit" colorScheme="blue" size="md"  width="full"  mb={4}>
            {'Login'}
          </Button>
        </form>

        <Flex justifyContent="space-between" alignItems="center">
          <Link color={"blue.500"} href="/register" textAlign="left">
            Create an account
          </Link>
          <Link color={"blue.500"} href="/" textAlign="right">
            Can't Login
          </Link>
        </Flex>
      </Box>
    </Container>
  );
}