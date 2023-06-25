import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { UserState } from '../context/ContextProvider'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from "../components/Navbar/Navbar"

import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Button,
    useColorModeValue,
    VStack,
    Box,
    chakra,
    Spinner,
    useToast
} from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react'

import CommentCard from '../components/Card/CommentCard'




const Post = () => {

    const colorBlue = useColorModeValue('blue.50', 'blue.900')
    const colorGrey = useColorModeValue('gray.100', 'gray.700')
    const { postId } = useParams()
    const { history } = UserState()
    const [post, setPost] = useState(null)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState(null)
    const [comment, setComment] = useState("")
    const [loadingLike, setLoadingLike] = useState(false)
    const [loadingComment, setLoadingComment] = useState(false)
    const toast = useToast()


    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || userInfo === null) {
            history.push('/')
        } else {
            setUser(userInfo)
            // console.log(userInfo)

            getPost(userInfo)

        }
        // console.log("User is "+user)
    }, [])


    const getPost = async (userInfo) => {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        try {
            const { data } = await axios.get(`https://ai-drisya.onrender.com/api/post/id/${postId}`, config)
            setPost(data)
            if (data.likedBy.includes(userInfo._id)) {
                setIsLiked(true)
            } else {
                setIsLiked(false)
            }
        } catch (error) {
            toast({
                title: 'Error Occured',
                description: 'Server Error',
                position:'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        }

    }

    const handleLike = async () => {
        console.log(user)
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        try {
            setLoadingLike(true)
            const link = `https://ai-drisya.onrender.com/api/post/${post.likedBy.includes(user._id) === true ? 'unlike' : 'like'}`
            const { data } = await axios.put(link, { _id: post._id }, config)
            setPost(data)


        } catch (error) {
            toast({
                title: 'Error Occured',
                description: 'Server Error',
                position:'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        } finally {

            check()
        }
    }

    const check = () => {
        if (post.likedBy.includes(user._id) === true) {
            setIsLiked(false)
        } else {
            setIsLiked(true)
        }
        setLoadingLike(false)
    }

    const handlePostComment = async () => {
        if (!comment || comment.length < 3) {
            toast({
                title: 'Error Occured',
                description: "Minimum coomment size should be 3",
                position:'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
            
            return;
        }
        try {
            setLoadingComment(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const body = {
                _id: post._id,
                comment: comment
            }
            const { data } = await axios.post('https://ai-drisya.onrender.com/api/post/comment', body, config)
            setPost(data)
            setComment("")
        } catch (error) {
            toast({
                title: 'Error Occured',
                description: 'Server Error',
                position:'top-right',
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
        } finally {
            setLoadingComment(false)
        }
    }


    return (
        <>
            <Navbar />
            {!post &&
                <Flex alignItems={'center'} justifyContent={'center'} maxW={'5xl'} py={12} mx={'auto'}>
                    

                        <Spinner
                            thickness='34px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    
                </Flex>
            }
            {post &&
                <Container maxW={'5xl'} py={12}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                        <Flex>
                            <Image
                                rounded={'md'}
                                alt={'feature image'}
                                src={post.image}
                                objectFit={'cover'}
                            />
                        </Flex>
                        <Stack spacing={4}>
                            <Text
                                textTransform={'uppercase'}
                                color={'blue.400'}
                                fontWeight={600}
                                fontSize={'sm'}
                                bg={colorBlue}
                                p={2}
                                alignSelf={'flex-start'}
                                rounded={'md'}>
                                <Link to={`/home/${post.createdBy._id}`} >
                                    View Author
                                </Link>
                            </Text>
                            <Heading>{post.heading}</Heading>
                            <Text color={'gray.500'} mb={1} fontSize={'lg'}>
                                {post.content}
                            </Text>
                            <Stack
                                spacing={4}
                                divider={
                                    <StackDivider
                                        borderColor={colorGrey}
                                    />
                                }>
                                <Stack direction={'row'} align={'center'}>
                                    <Text color={'gray.600'} >Author: </Text>
                                    <Text fontWeight={600}>{post.createdBy.name}</Text>
                                </Stack>
                                <Stack direction={'row'} align={'center'}>
                                    <Text color={'gray.600'} >Username: </Text>
                                    <Text fontWeight={600}>{post.createdBy.email}</Text>
                                </Stack>
                                <Stack direction={'row'} align={'center'}>
                                    <Text color={'gray.600'} >Created At: </Text>
                                    <Text fontWeight={600}>{post.createdBy.createdAt.split("T")[0]}</Text>
                                </Stack>
                                <Stack direction={'row'} align={'center'}>
                                    <Text color={'gray.600'} >Liked By: </Text>
                                    <Text fontWeight={600}>{post.likedBy.length}</Text>
                                </Stack>
                                <Stack direction={'row'} align={'center'} mt={2}>
                                    <Button
                                        onClick={handleLike}
                                        isLoading={loadingLike}
                                        px={8}
                                        fontSize={'md'}
                                        rounded={'full'}
                                        bg={isLiked !== true ? 'blue.400' : 'red.400'}
                                        color={'white'}
                                        boxShadow={
                                            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                        }
                                        _hover={{
                                            bg: isLiked !== true ? 'blue.500' : 'red.500',
                                        }}
                                        _focus={{
                                            bg: isLiked !== true ? 'blue.500' : 'red.500',
                                        }}>
                                        {isLiked ? "Unlike " : "Like "}

                                    </Button>
                                </Stack>
                                <VStack spacing={4} >
                                    <Textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder='Share your Views' />
                                    <Button
                                        onClick={handlePostComment}
                                        isLoading={loadingComment}
                                        colorScheme='whatsapp'>
                                        Leave a Commnet
                                    </Button>
                                </VStack>

                            </Stack>
                        </Stack>
                    </SimpleGrid>
                    <Box width={'fit-content'} mt={10} mx={'auto'}>
                        <chakra.h1
                            py={5}
                            fontSize={40}
                            fontFamily={'Work Sans'}
                            fontWeight={'bold'}
                        >
                            Comments
                        </chakra.h1>

                    </Box>
                    <CommentCard comment={post.comments} />
                </Container>
            }
        </>
    )
}

export default Post