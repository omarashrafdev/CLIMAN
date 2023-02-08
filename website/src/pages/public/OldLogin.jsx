import { useState } from 'react'
import { FormControl, InputRightElement, FormErrorMessage, FormHelperText, Input, InputGroup, Stack} from '@chakra-ui/react'
import { Flex, Center, Text, Button, Heading } from '@chakra-ui/react'
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons'
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'
import { json } from 'react-router-dom'


export default function OldLogin() {
    const [show, setShow] = useState(false)
    const showPassword = () => setShow(!show)
    const [err, setErr] = useState('')
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Errors vars
    const [emailBlankError, setEmailBlankError] = useState(false)
    const [passwordBlankError, setPasswordBlankError] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault();

        // Reset Errors
        setErr('')
        setEmailBlankError(false)
        setPasswordBlankError(false)

        if (email == '') {
            setEmailBlankError(true)
            return
        }
        if (password == '') {
            setPasswordBlankError(true)
            return
        }

        const response = await fetch(`http://localhost:8000/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            }),
        });
        if (response.status == 200) {
            // TODO: Redirect to home page
            setErr('Signed In')
            return
        }
        if (response.status == 401) {
            setErr("Invalid email or password")
        }
    }

    return (
        <Flex direction='column' alignItems='center'>
            <Stack spacing={4} paddingTop='10rem'>
                <Heading textAlign='center'>Sign In</Heading>
                <Text w='300px' textAlign='center'>
                    Welcome to CLIMAN, please put your sign in credentials below to start using our services
                </Text>

                {err && 
                    <Alert status='error' w='300px' borderRadius='15px'>
                        <AlertIcon />
                        <AlertTitle>{err}</AlertTitle>
                    </Alert>
                }
                <Center w='300px'>
                    <FormControl isRequired>
                            <Stack spacing={2}>
                                <FormControl isInvalid={emailBlankError}>
                                    <Input 
                                        id='email'
                                        placeholder='Email Address' 
                                        h='50px' 
                                        borderRadius='15px'
                                        focusBorderColor='#0d53fc' 
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        required
                                    />
                                    { emailBlankError && 
                                        <FormErrorMessage>Email is required</FormErrorMessage>
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
                                <Button colorScheme='blue' onClick={handleSubmit} type='submit' borderRadius='15px' bgColor='#0d53fc'>Sign In</Button>
                            </Stack>
                    </FormControl>
                </Center>
            </Stack>
        </Flex>
    )
}