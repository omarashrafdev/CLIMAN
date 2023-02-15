import { Image, Text, Flex, Box, Link } from '@chakra-ui/react'
import { ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons'
import { useContext } from "react";
import AuthContext from "../context/AuthContext";


export default function Header() {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <Flex 
            padding='0px 24px' 
            width='100%'
            alignItems='center'
            justifyContent='space-between'
            backgroundColor='#dee5f190'
            minHeight='64px'
        >
            <Link href='http://localhost:3000/' _hover='none'>
                <Box display='flex' flexDirection='row'>
                    <Image 
                        src='./././public/clinic.png' 
                        boxSize='50px'
                    />
                    <Text fontSize='3xl' fontWeight='500' margin='0px 16px'>CLIMAN</Text>
                </Box>
            </Link>
            <Box>
                {user ? 
                    <Link onClick={logoutUser}>
                        <CloseIcon color='#0d53fc' boxSize={7} />
                    </Link>
                :
                    <Link href='http://localhost:3000/login'>
                        <ArrowForwardIcon color='#0d53fc' boxSize={7} />
                    </Link>
                }
            </Box>
        </Flex>
    )
}
