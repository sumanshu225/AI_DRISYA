import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import getPrompt from '../functions/getRandomPrompt'
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar"

import {
    Box,
    Flex,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    Textarea,
    useBreakpointValue,
    Icon,
    Image,
    useToast
} from '@chakra-ui/react';


const CreatePost = () => {

    const history = useHistory()
    const [user, setUser] = useState(null)
    const [prompt, setPrompt] = useState("")
    const [heading, setHeading] = useState("")
    const [imgList, setImgList] = useState([])
    const [present, setPresent] = useState(false)
    const [photo, setPhoto] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [isPosting, setIsPosting] = useState(false)
    const toast = useToast()

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || userInfo === null) {
            history.push('/')
        } else {
            setUser(userInfo)
        }
    }, [])

    const handleSupriseMe = () => {
        setPresent(false)
        setPrompt(getPrompt(prompt))
    }

    const handleChange = (e) => {
        setPresent(false)
        setPrompt(e.target.value)
    }

    const handleGenerate = async () => {

        if (prompt.length < 2) {
            toast({
                title: 'Error Occured',
                description: "Minimum length must be 2",
                position: 'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })

            return
        }
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        try {
            setIsGenerating(true)
            const { data } = await axios.post('https://ai-drisya.onrender.com/api/ai', { prompt: prompt }, config)
            console.log(data)
            setImgList(data)
            let index = Math.floor(Math.random() * data.length)
            setPhoto(data[index])
            setPresent(true)
        } catch (error) {
            toast({
                title: 'Error Occured',
                description: 'Server Error',
                position: 'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } finally {
            setIsGenerating(false)
        }

    }

    const handleRegenerate = () => {

        if (imgList.length == 0) {
            toast({
                title: 'Error Occured',
                description: "No Image Present",
                position: 'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return
        }
        let index = Math.floor(Math.random() * imgList.length)
        setPhoto(imgList[index])

    }

    const handlePost = async () => {

        if (photo.toString() === "" || photo.length < 5) {
            toast({
                title: 'Error Occured',
                description: "No Image is generated",
                position: 'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return
        }

        if (!prompt || !heading) {
            toast({
                title: 'Error Occured',
                description: "Empty fields",
                position: 'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return
        }

        if (heading.length < 4) {
            toast({
                title: 'Error Occured',
                description: "Minimum heading length should be 4",
                position: 'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return
        }
        if (prompt.length < 2) {
            toast({
                title: 'Error Occured',
                description: "Minimum caption length should be 2",
                position: 'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return
        }

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }

        try {
            setIsPosting(true)
            const body = {
                "image": photo,
                "heading": heading,
                "content": prompt
            }
            const { data } = await axios.post('https://ai-drisya.onrender.com/api/post', body, config)
            console.log(data)
            history.push('/home')
        } catch (error) {
            toast({
                title: 'Error Occured',
                description: 'Server Error',
                position: 'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } finally {
            setIsPosting(false)
        }
    }


    return (
        <>
            <Navbar />
            <Box position={'relative'} overflow={'hidden'}>
                <Container
                    as={SimpleGrid}
                    maxW={'7xl'}
                    columns={{ base: 1, md: 2 }}
                    spacing={{ base: 10, lg: 32 }}
                    py={{ base: 10, sm: 20, lg: 32 }}>
                    <Stack spacing={{ base: 10, md: 20 }}>

                        <Image src={photo} />
                    </Stack>
                    <Stack
                        bg={'gray.50'}
                        rounded={'xl'}
                        p={{ base: 4, sm: 6, md: 8 }}
                        spacing={{ base: 8 }}
                        maxW={{ lg: 'lg' }}>
                        <Stack spacing={4}>
                            <Heading
                                color={'gray.800'}
                                lineHeight={1.1}
                                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
                                Create a Post
                                <Text
                                    as={'span'}
                                    bgGradient="linear(to-r, blue.400,purple.400)"
                                    bgClip="text">
                                    !
                                </Text>
                            </Heading>
                            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                                We’re looking for amazing engineers just like you! Become a part
                                of our rockstar engineering team and skyrocket your career!
                            </Text>
                        </Stack>
                        <Box as={'form'} >
                            <Stack spacing={4}>
                                <Input
                                    value={heading}
                                    onChange={(e) => setHeading(e.target.value)}
                                    placeholder="Title"
                                    bg={'gray.100'}
                                    border={0}
                                    color={'gray.500'}
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                />
                                <Textarea
                                    value={prompt}
                                    onChange={handleChange}
                                    placeholder="Describe the Image you want to generate"
                                    bg={'gray.100'}
                                    border={0}
                                    color={'gray.500'}
                                    _placeholder={{
                                        color: 'gray.500',
                                    }}
                                />
                                <Button
                                    onClick={handleSupriseMe}
                                    fontFamily={'heading'} bg={'gray.200'} color={'gray.800'}>
                                    Suprise me
                                </Button>
                                <Button
                                    onClick={present === true ? handleRegenerate : handleGenerate}
                                    isLoading={isGenerating}
                                    fontFamily={'heading'} bg={'gray.200'} color={'gray.800'}>
                                    {present === true ? 'ReGenerate' : 'Generate'}

                                </Button>

                            </Stack>
                            <Button
                                onClick={handlePost}
                                isLoading={isPosting}
                                fontFamily={'heading'}
                                mt={8}
                                w={'full'}
                                bgGradient="linear(to-r, blue.400,purple.400)"
                                color={'white'}
                                _hover={{
                                    bgGradient: 'linear(to-r, blue.400,purple.400)',
                                    boxShadow: 'xl',
                                }}>
                                Submit
                            </Button>
                        </Box>
                        form
                    </Stack>
                </Container>
                <Blur
                    position={'absolute'}
                    top={0}
                    left={0}
                    style={{ filter: 'blur(70px)' }}
                />
            </Box>

        </>
    )
}

export const Blur = (props) => {
    return (
        <Icon
            width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
            zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
            height="560px"
            viewBox="0 0 528 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <circle cx="71" cy="61" r="111" fill="#6589f5" />
            <circle cx="244" cy="106" r="139" fill="#65f5f0" />
            <circle cy="291" r="139" fill="#352763" />
            <circle cx="80.5" cy="189.5" r="101.5" fill="#2bd91e" />
            <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
            <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
            <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
        </Icon>
    );
};

export default CreatePost