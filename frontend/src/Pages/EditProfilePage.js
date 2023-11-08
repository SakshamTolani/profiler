import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Select,
    InputGroup,
    InputLeftAddon,
    FormHelperText,
    InputRightAddon,
    useToast,
} from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
    const [profileLoading, setProfileLoading] = useState(false);
    const [gender, setGender] = useState("");
    const [mobile, setMobile] = useState("");
    const [dob, setDob] = useState("");
    const [age, setAge] = useState("");
    const [user, setUser] = useState(null);
    const toast = useToast();
    const navigate = useNavigate();

    let editProfile = async () => {
        let userProfile = JSON.parse(localStorage.getItem("userProfile"));
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        if (userProfile) {
            setGender(userProfile.gender);
            setMobile(userProfile.mobile);
            setDob(userProfile.dob);
            setAge(userProfile.age);
        } else {
            toast({
                title: 'Some Error Occured',
                description: 'Please retry after sometime',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    const handleAge = (birthday) => {
        let today = new Date(),
            dobirth = new Date(birthday),
            diff = today.getTime() - dobirth.getTime(),
            years = Math.floor(diff / 31556736000);
        setDob(birthday);
        setAge(years);
    }
    const handleLogout = () => {
        setProfileLoading(true);
        localStorage.removeItem('userInfo');
        localStorage.removeItem('userProfile');
        setProfileLoading(false);
        navigate("/");
        toast({
            title: "Logged Out Successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
    };

    const handleSubmit = async () => {
        setProfileLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.put(
                "/api/profile/update",
                {
                    gender: gender,
                    mobile: mobile,
                    dob: dob,
                    age: age
                },
                config
            );
            toast({
                title: "Updated Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userProfile", JSON.stringify(data.data));
            setProfileLoading(false);
            editProfile();
        } catch (error) {
            toast({
                title: "Error Occured",
                description: "Error Occured",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setProfileLoading(false);
        }
    }

    useEffect(() => {
        editProfile();
        let userProfile = JSON.parse(localStorage.getItem("userProfile"));
        if (!userProfile) navigate("/create-profile")
    }, [])
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            width={"100%"}
            bgImage="linear-gradient( 291.7deg,  rgba(255,134,134,1) 21.5%, rgba(249,141,255,1) 93.1% )"
        >
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                    User Profile Edit
                </Heading>
                <FormControl mr="5%" isRequired>
                    <FormLabel htmlFor="gender" fontWeight={'normal'}>
                        Gender
                    </FormLabel>
                    <Select placeholder='Select Gender' value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="mobile" fontWeight={'normal'}>
                        Mobile
                    </FormLabel>
                    <InputGroup>
                        <InputLeftAddon children='+91' />
                        <Input type='tel' placeholder='phone number' value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </InputGroup>
                    <FormHelperText>We&apos;ll never share your details.</FormHelperText>
                </FormControl>
                <FormControl mt="2%" isRequired>
                    <FormLabel htmlFor="dob" fontWeight={'normal'}>
                        Date of Birth (DOB)
                    </FormLabel>
                    <Input
                        placeholder="Select Date of Birth"
                        size="md"
                        type="date"
                        value={dob}
                        onChange={(e) => handleAge(e.target.value)}
                    />
                </FormControl>
                <FormControl isReadOnly isRequired>
                    <FormLabel htmlFor="age" fontWeight={'normal'} mt="2%">
                        Age
                    </FormLabel>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type='number'
                            placeholder={"Enter Age"}
                            value={age}
                        // onChange={}  
                        />
                        <InputRightAddon children='Years' />
                    </InputGroup>
                </FormControl>
                <Stack spacing={6} direction={['column', 'row']}>
                    <Button
                        bg={'red.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'red.500',
                        }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'blue.500',
                        }}
                        onClick={handleSubmit}
                        isLoading={profileLoading}
                    >
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    )
}

export default EditProfilePage