import { NavLink as ReactNavLink } from "react-router-dom";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Link,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

// Define navigation links
const Links = [
  {
    value: "About",
    to: "/about",
  },
];

// NavLink component for consistent styling
export const NavLink = ({ to, children }) => (
  <ReactNavLink to={to}>
    {({ isActive }) => (
      <Link
        as={ReactNavLink}
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
          textDecoration: "none",
          // bg: useColorModeValue('gray.200', 'gray.700')
        }}
        background={isActive ? "blue.400" : "none"}
        color={isActive ? "white" : "white"}
        to={to}
      >
        {children}
      </Link>
    )}
  </ReactNavLink>
);

// Navbar component
export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={"blue.700"} px={100} position="fixed" width="100%" zIndex="1000">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box boxSize="100px">
              <Image src="./logo-text.png" boxSize="100%" objectFit="contain" />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.to} to={link.to}>
                  {link.value}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Link href="/register">
            <Button colorScheme="blue">Try for free</Button>
          </Link>
          {/* <Flex alignItems={'center'}>
            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Avatar size={'sm'} src={'https://your-image-url.jpg'} />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex> */}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.to} to={link.to}>
                  {link.value}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box pt={16} /> {/* Add padding-top to create space below the fixed navbar */}
    </>
  );
}
