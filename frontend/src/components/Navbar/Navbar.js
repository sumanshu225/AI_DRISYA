import React from 'react'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/';
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
  useDisclosure,
  useColorModeValue,
  Stack,
  Image
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom'
import { UserState } from '../../context/ContextProvider';

import Logo from "../../img/logo.png"

const Navbar = () => {


  const history = useHistory()

  const { changer, setChanger } = UserState()

  const NavLink = ({ children, link }) => (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      to={link}>
      {children}
    </Link>
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(null)
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || userInfo === null) {
      setUser(null)
    } else {
      setUser(userInfo)

    }

  }, [changer])

  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    setUser(null)
    history.push('/')
  }


  return (
    <>

      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Link to={`/home`}>
              
              <Image  width={'8rem'} src={Logo} alt='logo' />
              
            </Link>
            {/* If User is Present then show menu items */}
            {user &&
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                <button onClick={() => { setChanger(!changer); history.push('/home') }}>
                  Home
                </button>
                <NavLink link="/create">
                  Create
                </NavLink>
              </HStack>
            }
          </HStack>
          <Flex alignItems={'center'}>
            {user &&
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={
                      `https://ui-avatars.com/api/?name=${user.name}&background=random`
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => { setChanger(!changer); history.push(`/home/${user._id}`) }}>
                    My Post
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            }
          </Flex>
        </Flex>

        {( user && isOpen) && (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <div onClick={() => { setChanger(!changer); history.push('/home') }}>
                Home
              </div>
              <NavLink link="/create">
                Create
              </NavLink>
            </Stack>
          </Box>
        ) }

      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  )
}

export default Navbar