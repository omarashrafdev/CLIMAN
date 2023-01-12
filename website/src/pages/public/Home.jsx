import { Box, Button, Container, Heading, Text, Image } from "@chakra-ui/react";

export default function Home() {
    return (
        <Container padding='40px 10px' maxW='85%' position='relative' minHeight='100vh'>
            <Heading textAlign='center' fontSize='4em'>Clinic Management System</Heading>
            <Box
                display='flex' 
                flexDirection='row'
                justifyContent='space-between'
                marginTop='40px' 
                padding='40px'
                backgroundColor='#0d53fc'
            >
                <Box 
                    display='flex' 
                    flexDirection='column'
                    gap='20px' 
                    color='white'
                >
                    <Text fontSize='3em' fontWeight='700'>Helping you focus on<br />your patients</Text>
                    <Text fontWeight='500'>CLIMAN helps you run a streamlined and automated clinic.<br />So you can provide better care to your patients.</Text>
                    <Button backgroundColor='#49c496' width='200px'>REGISTER NOW</Button>
                </Box>

                <Box>
                    <Image 
                        src="./././public/laptop.png"
                        width='400px'
                        height='250px'
                    />-
                </Box>
            </Box>
        </Container>
    )
}