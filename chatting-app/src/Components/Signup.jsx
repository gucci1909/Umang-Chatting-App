import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";

const firebaseConfig = {
  apiKey: "AIzaSyDu9vt8G3TVHwkJvfilXa0lyvwst3Da_lI",
  authDomain: "a-chatting-app-b721d.firebaseapp.com",
  projectId: "a-chatting-app-b721d",
  storageBucket: "a-chatting-app-b721d.appspot.com",
  messagingSenderId: "145084853077",
  appId: "1:145084853077:web:693671cbb7de2a63b15ddc",
  measurementId: "G-0S6LDGBZEV",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function Signup() {
  const logginIn = () => {
    // e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <Box>
      <Heading
        fontSize={{ base: "24px", md: "40px", lg: "56px" }}
        color={"tomato"}
      >
        Welcome to Umang Arora's Chatting App
      </Heading>
      <Link color="tomato" fontSize={{ base: "14px", lg: "20px" }}>
        <a href="https://github.com/gucci1909/Umang-Chatting-App.git">
          GitHub Repo Link
        </a>
      </Link>
      <Flex justify="center" alignItems="center" gap="20">
        <Image
          display={{ base: "none", lg: "flex" }}
          ml={{ base: "20px" }}
          borderRadius={"20px"}
          mt={"20px"}
          src="https://31.media.tumblr.com/53963172b81679292c24a06a1da194f2/tumblr_n4r922VwHJ1rdutw3o1_400.gif"
          alt="joker"
        />
        <Image
          borderRadius={"20px"}
          mt={"20px"}
          src="https://www.readunwritten.com/wp-content/uploads/texting-gif.gif"
          alt="joker"
        />
      </Flex>
      <Box
        bg="tomato"
        w="400px"
        ml={{ base: "0px", md: "140px", lg: "550px" }}
        p={1}
        borderRadius={"20px"}
        mt={{ base: "10px", lg: "40px" }}
        color="white"
      >
        <Text>Lets Do Something Interesting </Text>
      </Box>

      <Image
        display={{ base: "flex", lg: "none" }}
        src="https://media0.giphy.com/media/5QQ6FpAQ0syYLkONPB/giphy.gif"
      ></Image>
      <Button zIndex={2} mt="auto" colorScheme="green" onClick={logginIn}>
        Sign up
      </Button>
    </Box>
  );
}

export default Signup;
