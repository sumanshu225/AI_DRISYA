import React from 'react'
import { Link } from 'react-router-dom'
import {
    Flex,
    Circle,
    Box,
    Image,
    Badge,
    useColorModeValue,
    Icon,
    chakra,
    Tooltip,
} from '@chakra-ui/react';
// import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
// import { FiShoppingCart } from 'react-icons/fi';

const ImgCard = ({ post }) => {

    return (
        <>

            <Link to={`/post/${post._id}`}  >
                <Flex mx={{ base: '0',md:'5' ,lg: '5' }} my={5} w="full" alignItems="center" justifyContent="center">
                    <Box
                        bg={useColorModeValue('white', 'gray.800')}
                        maxW="sm"
                        borderWidth="1px"
                        rounded="lg"
                        shadow="lg"
                        position="relative">

                        <Image
                            src={post.image}
                            alt={`Picture of ${post.heading}`}
                            roundedTop="lg"
                        />

                        <Box p="6">
                            <Flex mt="1" justifyContent="space-between" alignContent="center">
                                <Box
                                    fontSize="2xl"
                                    fontWeight="semibold"
                                    as="h4"
                                    lineHeight="tight"
                                    isTruncated>
                                    {post.heading}
                                </Box>

                            </Flex>

                            <Flex flexDirection={'row'} justifyContent="space-between" alignContent="center">
                                {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
                                <Box fontSize="xl" color={useColorModeValue('gray.800', 'white')}>
                                    <Box as="span" color={'gray.600'} fontSize="lg">
                                        Author
                                    </Box>
                                    <Box as="span" pl={3}>
                                    {post.createdBy.name}
                                    </Box>
                                </Box>
                            </Flex>
                            <Flex flexDirection={'row'} justifyContent="space-between" alignContent="center">
                                {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
                                <Box fontSize="xl" color={useColorModeValue('gray.800', 'white')}>
                                    <Box as="span" color={'gray.600'} fontSize="lg">
                                        Liked By 
                                    </Box>
                                    <Box as="span" pl={3}>
                                     {post.likedBy.length} User{post.likedBy.length==1?'':'s'}
                                    </Box>
                                </Box>
                            </Flex>
                        </Box>
                    </Box>
                </Flex>


            </Link>
        </>
    )
}

export default ImgCard