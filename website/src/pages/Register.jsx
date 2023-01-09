import { useState } from 'react'
import { FormControl, InputRightElement, FormErrorMessage, FormHelperText, Input, InputGroup, Stack} from '@chakra-ui/react'
import { Flex, Center, Text, Button, Heading } from '@chakra-ui/react'
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons'
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'


export default function Register() {
    const [show, setShow] = useState(false)
    const showPassword = () => setShow(!show)
    const [err, setErr] = useState('')
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
        setErr('')
        setFirstNameBlankError(false)
        setLastNameBlankError(false)
        setEmailBlankError(false)
        setPasswordBlankError(false)
        setPasswordConfirmBlankError(false)

        if (firstName == '') {
            setFirstNameBlankError(true)
            return
        }
        if (lastName == '') {
            setLastNameBlankError(true)
            return
        }
        if (email == '') {
            setEmailBlankError(true)
            return
        }
        if (password == '') {
            setPasswordBlankError(true)
            return
        }
        if (passwordConfirm == '') {
            setPasswordConfirmBlankError(true)
            return
        }

        // Password validation
        if (!(password === passwordConfirm)) {
            setErr('Passwords Doesn\'t match')
            return
        }

        const response = await fetch(`http://localhost:8000/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "first_name": firstName,
                "last_name": lastName,
                "password": password,
                "password2": passwordConfirm
            }),
        });
        if (response.status == 201) {
            // TODO: Redirect to home page
            setErr('Signed up')
            return
        }
        if (response.status == 401) {
            setErr("Invalid information")
        }
    }

    return (
        <Flex direction='column' alignItems='center'>
            <Stack spacing={4} paddingTop='10rem'>
                <Heading textAlign='center'>Sign Up</Heading>
                <Text w='300px' textAlign='center'>
                    Welcome to CLIMAN, please fill out the information below to start using our services
                </Text>


                {err && 
                    <Alert status='error' w='300px' borderRadius='15px'>
                        <AlertIcon />
                        <AlertTitle>{err}</AlertTitle>
                    </Alert>
                }
                <Center w='300px'>
                    <FormControl>
                            <Stack spacing={2}>
                                <FormControl isInvalid={firstNameBlankError}>
                                    <Input 
                                        id='first_name'
                                        placeholder='First Name' 
                                        h='50px' 
                                        borderRadius='15px' 
                                        focusBorderColor='#0d53fc' 
                                        onChange={(e) => { setFirstName(e.target.value) }}
                                        required
                                    />
                                    { firstNameBlankError && 
                                        <FormErrorMessage>First name is required.</FormErrorMessage>
                                    }
                                </FormControl>
                                <FormControl isInvalid={lastNameBlankError}>
                                    <Input 
                                        id='last_name'
                                        placeholder='Last Name' 
                                        h='50px' 
                                        borderRadius='15px' 
                                        focusBorderColor='#0d53fc' 
                                        onChange={(e) => { setLastName(e.target.value) }}
                                        required
                                    />
                                    { lastNameBlankError && 
                                        <FormErrorMessage>Last name is required.</FormErrorMessage>
                                    }
                                </FormControl>
                                <FormControl isInvalid={emailBlankError}>
                                    <Input 
                                        id='email'
                                        placeholder='Email Address' 
                                        type='email'
                                        h='50px' 
                                        borderRadius='15px' 
                                        focusBorderColor='#0d53fc' 
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        required
                                    />
                                    { emailBlankError && 
                                        <FormErrorMessage>Email is required.</FormErrorMessage>
                                    }
                                </FormControl>
                                <InputGroup>
                                    <FormControl isInvalid={passwordBlankError}>
                                        <Input 
                                            id='password'
                                            type={show ? 'text' : 'password'} 
                                            placeholder='Password' h='50px' 
                                            borderRadius='15px' 
                                            focusBorderColor='#0d53fc'
                                            onChange={(e) => { setPassword(e.target.value) }}
                                        />
                                        <InputRightElement width='50px' height='50px'>
                                            <Button width='30px' size='sm' onClick={showPassword}>
                                            {show ? <ViewOffIcon color='#0d53fc' /> : <ViewIcon color='#0d53fc' />}
                                            </Button>
                                        </InputRightElement>
                                        { passwordBlankError && 
                                            <FormErrorMessage>Password is required</FormErrorMessage>
                                        }
                                    </FormControl>
                                </InputGroup>
                                <InputGroup>
                                    <FormControl isInvalid={passwordConfirmBlankError}>
                                        <Input 
                                            id='password'
                                            type={show ? 'text' : 'password'} 
                                            placeholder='Confirm Password' h='50px' 
                                            borderRadius='15px' 
                                            focusBorderColor='#0d53fc'
                                            onChange={(e) => { setPasswordConfirm(e.target.value) }}
                                        />
                                        { passwordConfirmBlankError && 
                                            <FormErrorMessage>Password is required</FormErrorMessage>
                                        }
                                    </FormControl>
                                </InputGroup>
                                <Button 
                                    colorScheme='blue' 
                                    onClick={handleSubmit} 
                                    type='submit' 
                                    borderRadius='15px' 
                                    bgColor='#0d53fc'
                                >
                                    Create Account
                                </Button>
                            </Stack>
                    </FormControl>
                </Center>
            </Stack>
        </Flex>
    )
}