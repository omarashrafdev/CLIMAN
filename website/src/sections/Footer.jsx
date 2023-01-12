import { Flex, Box, Image, Text, Link } from '@chakra-ui/react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';


export default function Footer() {
    const facebookColor = '#4267B2'
    const instagramColor = '#C13584'
    const twitterColor = '#1DA1F2'
    const copyrightColor = '#7a839e'

    return (
        <Flex
            position='absolute'
            width='100%'
            bottom='0'
            padding='15px 24px' 
            flexDirection='column'
            gap='10px'
            backgroundColor='#dee5f190'
            minHeight='64px'
        >
            <Box display='flex' flexDirection='row'>
                <Image 
                    src='./././public/clinic.png' 
                    boxSize='20px'
                />
                <Text fontSize='1xl' fontWeight='500' margin='0px 5px'>CLIMAN</Text>
            </Box>

            <Box>
                <Text fontSize='1xl' fontWeight='400'>
                    <Text as='b'>CLIMAN</Text> is an online clinic management tool that connects doctors with their patients.
                </Text>
            </Box>

            <Box display='flex' flexDirection='row' gap='10px'>
                <Link href='https://www.facebook.com/omar.ashraf.dev' target='_blank'><FaFacebook color={facebookColor} size='20px' /></Link>
                <Link href='https://twitter.com/OmarAshrafDev' target='_blank'><FaTwitter color={twitterColor} size='20px' /></Link>
                <Link href='https://www.instagram.com/omarashrafdev/' target='_blank'><FaInstagram color={instagramColor} size='20px' /></Link>
            </Box>

            <Box display='flex' flexDirection='row' alignItems='center' gap='5px'>
                <Text color={copyrightColor}>© 2023 CLIMAN</Text>
            </Box>
        </Flex>
    )
}