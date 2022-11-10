import React from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';

const firebaseConfig = {
    apiKey: "AIzaSyDu9vt8G3TVHwkJvfilXa0lyvwst3Da_lI",
      authDomain: "a-chatting-app-b721d.firebaseapp.com",
      projectId: "a-chatting-app-b721d",
      storageBucket: "a-chatting-app-b721d.appspot.com",
      messagingSenderId: "145084853077",
      appId: "1:145084853077:web:693671cbb7de2a63b15ddc",
      measurementId: "G-0S6LDGBZEV"
};

firebase.initializeApp(firebaseConfig);
  
  
const auth = firebase.auth();


function Signup() {
    const logginIn = ()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
  return (
    <Box>
        <Heading color={"tomato"}>Welcome to Umang Arora's Chatting App</Heading>
        <Flex justify="center" alignItems="center" gap="20">
      <Image borderRadius={"20px"} mt={"20px"} src='https://31.media.tumblr.com/53963172b81679292c24a06a1da194f2/tumblr_n4r922VwHJ1rdutw3o1_400.gif' alt="joker"/>
      <Image  borderRadius={"20px"} mt={"20px"} src='https://www.readunwritten.com/wp-content/uploads/texting-gif.gif' alt="joker"/>

        </Flex>
        <Box bg='tomato' w='400px' ml="550px" p={1} borderRadius={"20px"} mt={"40px"} color='white'>
        <Text  >Lets Do Something Interesting </Text>

        </Box>

            <Button mt="30px" colorScheme='green' onClick={logginIn}>Sign up</Button>
    </Box>
  )
}

export default Signup
