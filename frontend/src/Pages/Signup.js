import React from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';
import { useState,useEffect } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { isEmail } from 'validator'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import  Navbar  from "../components/Navbar/Navbar"



const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const toast = useToast()

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            history.push('/home')
        }
    }, [history])


    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async () => {

        // Validations
        if (!name || name.length < 3) {
            toast({
                title: 'Error Occured',
                description: 'Minimum name length should be 3',
                position:'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
            return
        }

        if (!password || password.length < 8) {
            toast({
                title: 'Error Occured',
                description: 'Minimum password length should be 8',
                position:'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
            return
        }

        if (!email || isEmail(email) === false) {
            toast({
                title: 'Error Occured',
                description: 'Invalid Email',
                position:'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
            return
        }

        // API CALL
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }

        console.log(`${name} ${email} ${password}`)

        try {
            setLoading(true)
            const { data } = await axios.post('https://ai-drisya.onrender.com/api/user/signup', { name, email, password }, config)
            localStorage.setItem('userInfo', JSON.stringify(data))
            setEmail("")
            setName("")
            setPassword("")
            history.push('/home')
        } catch (error) {
            toast({
                title: 'Error Occured',
                description: 'Email already Exists',
                position:'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        } finally {
            setLoading(false)
        }

    }



    return (
        <>
            <Navbar />
            <Flex
                minH={'95vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign up
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool features ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        minW={{base: '99%', md: 'md',}}
                        p={8}>
                        <Stack spacing={4} >
                            <Box>
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>Name</FormLabel>
                                    <Input type="text" value={name} onChange={handleName} />
                                </FormControl>
                            </Box>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" value={email} onChange={handleEmail} />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} value={password} onChange={handlePassword} />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    isLoading={loading}
                                    onClick={handleSubmit}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link to={'/Signin'}  >
                                        <Text as="span" color={'blue.400'}>
                                            Login
                                        </Text>
                                    </Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    )
}

export default Signup