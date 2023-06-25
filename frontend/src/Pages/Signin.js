import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';
import Navbar from "../components/Navbar/Navbar"
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { isEmail } from 'validator'
import axios from 'axios';

const Signin = () => {


    
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            history.push('/home')
        }
    }, [history])

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async () => {

        // Checking
        if (!password || password.length < 8) {
            toast({
                title: 'Error Occured',
                description: 'Minimun password length should be 8',
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

        try {
            setLoading(true)
            const { data } = await axios.post('https://ai-drisya.onrender.com/api/user/login', { email, password }, config)
            localStorage.setItem('userInfo', JSON.stringify(data))
            setUser(data)
            setEmail("")
            setPassword("")
            history.push('/home')
        } catch (error) {
            toast({
                title: 'Error Occured',
                description: 'Invalid Credentials',
                position:'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
            console.log(error)
        }finally{
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
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input value={email} onChange={handleEmail} type="email" />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input value={password} onChange={handlePassword} type="password" />
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    loadingText="Submitting"
                                    onClick={handleSubmit}
                                    mt={4}
                                    bg={'blue.400'}
                                    color={'white'}
                                    isLoading={loading}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign in
                                </Button>
                                <Text align={'center'}>
                                    New user? <Link to={'/Signup'}  >
                                        <Text as="span" color={'blue.400'}>
                                            Signup
                                        </Text>
                                    </Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}

export default Signin