import {
    Avatar,
    chakra,
    Flex,
    SimpleGrid,
    useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';


function TestimonialCard({ comment }) {

    return (
        <Flex
            boxShadow={'lg'}
            maxW={'640px'}
            direction={{ base: 'column-reverse', md: 'row' }}
            width={'full'}
            rounded={'xl'}
            p={5}
            justifyContent={'space-between'}
            position={'relative'}
            bg={useColorModeValue('white', 'gray.800')}
        >
            <Flex
                direction={'column'}
                textAlign={'left'}
                justifyContent={'space-between'}>
                <chakra.p
                    fontFamily={'Inter'}
                    fontWeight={'medium'}
                    fontSize={'15px'}
                    pb={4}>
                    {comment.comment}
                </chakra.p>
                <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
                    <Link to={`/home/${comment.user._id}`}>
                        {comment.user.name}
                    </Link>
                    <chakra.span
                        fontFamily={'Inter'}
                        fontWeight={'medium'}
                        color={'gray.500'}>
                        {' '}
                        - {comment.createdAt.split("T")[0]}
                    </chakra.span>
                </chakra.p>
            </Flex>
            <Link to={`/home/${comment.user._id}`}>

                <Avatar
                    src={`https://ui-avatars.com/api/?name=${comment.user.name}&background=random`}
                    height={'80px'}
                    width={'80px'}
                    alignSelf={'center'}
                    m={{ base: '0 0 35px 0', md: '0 0 0 50px' }}
                />
            </Link>
        </Flex>
    );
}

const CommentCard = ({ comment }) => {
    return (
        <Flex
            textAlign={'center'}
            pt={10}
            justifyContent={'center'}
            direction={'column'}
            width={'full'}
            overflow={'hidden'}>
            <SimpleGrid
                columns={{ base: 1, xl: 2 }}
                spacing={'20'}
                mt={16}
                mb={16}
                mx={'auto'}>
                {comment.map((c, index) => (
                    <TestimonialCard comment={c} key={c._id} />
                ))}
            </SimpleGrid>
        </Flex>
    );
}

export default CommentCard
