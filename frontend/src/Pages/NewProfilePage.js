import { useEffect, useState } from 'react'
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  InputLeftAddon,
  InputGroup,
  FormHelperText,
  InputRightAddon,
} from '@chakra-ui/react'
import axios from 'axios';

import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

const NewProfilePage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [profileLoading, setProfileLoading] = useState(false);
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(90);
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    setUser(userInfo);
    if (userProfile) navigate("/chats");
    if (!userInfo) navigate("/");
  }, [navigate]);
  const handleAge = (birthday) => {
    let today = new Date(),
      dobirth = new Date(birthday),
      diff = today.getTime() - dobirth.getTime(),
      years = Math.floor(diff / 31556736000);
    setDob(birthday);
    setAge(years);
  }

  const handleSubmit = async () => {
    setProfileLoading(true);
    if (!gender || !dob || !mobile || !age) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setProfileLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/profile/create",
        {
          gender,
          mobile,
          dob,
          age
        },
        config
      );
      toast({
        title: "Registeration Successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // window.location.reload(false);
      localStorage.setItem("userProfile", JSON.stringify(data));
      setProfileLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setProfileLoading(false);
    }
  }


  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        maxHeight={500}
        p={6}
        m="10px auto"
        as="form">
        <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated></Progress>
        <>
          <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
            User Profile Registration
          </Heading>
          <Flex>
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
          </Flex>
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
        </>
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1)
                  setProgress(progress - 10)
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%">
                Back
              </Button>
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={handleSubmit}
                isLoading={profileLoading}
              >
                Submit
              </Button>
            </Flex>
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  )
}

export default NewProfilePage;
