import React, { useEffect, useRef, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
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

function Chatting() {
  const space = useRef(null);
  const [messageValue, setMessageValue] = useState("");
  const [data, setData] = useState([]);
  const handleData = async () => {
    let res = await fetch(`https://mc-square-api-umang.onrender.com/chatting`);
    res = await res.json();
    setData(res);
    space.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    handleData();
  }, [data]);

  const requestToMessage = async (e) => {
    e.preventDefault();
    if (messageValue.length === 0) {
      return;
    } else {
      let { displayName, photoURL, uid } = auth.currentUser;
      let data1 = {
        message: messageValue,
        photoURL: photoURL,
        displayName: displayName,
        uid: uid,
      };
      setMessageValue("");
      let res = await fetch(
        `https://mc-square-api-umang.onrender.com/chatting`,
        {
          method: "POST",
          body: JSON.stringify(data1),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res = await res.json();
      console.log(res);
      handleData();
      
    }
  };
  const handleMessage = (id, currentphotoURL) => {
    let { photoURL } = auth.currentUser;
    if (photoURL === currentphotoURL) {
      const new_message = prompt("New Message");
      setTimeout(function () {
        handleEdit(new_message, id);
      }, 2000);
    } else {
      alert("You don't have access to this message");
    }
  };
  const handleEdit = async (message, id) => {
    if (message.length === 0) {
      alert("write something in edit");
    } else {
      const data = {
        message: message,
      };
      let res = await fetch(
        `https://mc-square-api-umang.onrender.com/chatting/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res = await res.json();
      console.log(res);
      handleData();
    }
  };
  const handleDelete = async (id, currentphotoURL) => {
    let { photoURL } = auth.currentUser;
    if (photoURL === currentphotoURL) {
      let res = await fetch(
        `https://mc-square-api-umang.onrender.com/chatting/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res = res.json;
      console.log(res);
      handleData();
    } else {
      alert("You don't have access to this message");
    }
  };
  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      if (messageValue.length === 0) {
        return;
      } else {
        let { displayName, photoURL, uid } = auth.currentUser;
        let data1 = {
          message: messageValue,
          photoURL: photoURL,
          displayName: displayName,
          uid: uid,
        };
        setMessageValue("");
        let res = await fetch(
          `https://mc-square-api-umang.onrender.com/chatting`,
          {
            method: "POST",
            body: JSON.stringify(data1),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        res = await res.json();
        console.log(res);
        handleData();
        
      }
    } else {
      console.log("enter right key for sending message");
    }
  };
  const { photoURL } = auth.currentUser;
  

  return (
    <>
      <Box>
        <Flex justify="center" alignItems="centre" height="40px" mt={3} gap="2">
          <Heading
            color={"tomato"}
            ml={{base:"-10px"}}
            mt={{ lg: "-20px" }}
            fontSize={{ base: "20px", md: "30px", lg: "40px" }}
          >
            Umang's Chatting App
          </Heading>
          <Button
            colorScheme="blue"
            mt={{ lg: "-10px" }}
            ml={{ base: "0px", lg: "0px" }}
            zIndex={2}
            onClick={() => auth.signOut()}
          >
            Sign Out
          </Button>
        </Flex>
        <Flex
         flexDirection={"column"}
          height={"620px"}
          ml={{ base: "0px", lg: "100px" }}
          mt={{ base: "-15px", lg: "-15px" }}
          overflow="scroll"
          gap={"6"}
        >
          {data.chattingapps &&
            data.chattingapps.map((el, i) =>
              photoURL === el.photoURL ? (
                <>
                  <Flex
                    justify="right"
                    alignItems="right"
                    height="auto"
                    w={{ base: "auto", lg: "850px" }}
                    mt={{ base: "20px", lg: "20px" }}
                    ml={{ base: "-480px", lg: "200px" }}
                    gap="2"
                    key={i}
                  >
                    <Box
                      bg="tomato"
                      w={{ base: "200px", lg: "auto" }}
                      p={1}
                      justify="center"
                      alignItems="center"
                      h={{ base: "auto", lg: "auto" }}
                      borderRadius={"20px"}
                      mt={"auto"}
                      color="white"
                    >
                      <Text fontSize="lg">{el.message}</Text>
                    </Box>
                    <Image
                      borderRadius="full"
                      boxSize="50px"
                      src={el.photoURL}
                      alt="Google account pic"
                    />
                  </Flex>
                  <Flex
                    justify={"center"}
                    alignItems={"center"}
                    mt={"-20px"}
                    ml={{ base: "240px", lg: "500px" }}
                  >
                    <Flex
                      gap="10px"
                    >
                      <Button
                        h="22px"
                        colorScheme="teal"
                        onClick={() => handleMessage(el._id, el.photoURL)}
                      >
                        <AiFillEdit />
                      </Button>
                      <Button
                        h="22px"
                        colorScheme="red"
                        onClick={() => handleDelete(el._id, el.photoURL)}
                      >
                        <BsFillTrashFill />
                      </Button>
                    </Flex>
                  </Flex>
                </>
              ) : (
                <Box
                  justify="left"
                  ml={{ base: "0px", lg: "350px" }}
                  alignItems="center"
                  display={"flex"}
                  mt={{ base: "5px", lg: "30px" }}
                  h={"30px"}
                  w="auto"
                  height={{ base: "auto", lg: "45px" }}
                  gap="2"
                  key={i}
                >
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    src={el.photoURL}
                    alt="Google account pic"
                  />

                  <Flex
                    flexDirection={"column"}
                  >
                    <Box
                      ml={"0px"}
                      color="linear-gradient(to left, #553c9a, #b393d3);"
                      fontWeight="600"
                      p={1}
                      mt={{ base: "0px", lg: "0px" }}
                      borderRadius={"20px"}
                    >
                      <Text
                        borderRadius={"20px"}
                        bgGradient="linear(to-l, #778899	,lightgreen)"
                        w="80px"
                      >
                        {el.displayName.split(" ")[0]}
                      </Text>
                    </Box>
                    <Box
                      bg="#718096"
                      w="auto"
                      p={1}
                      borderRadius={"20px"}
                      mt={{ base: "auto", lg: "auto" }}
                      color="white"
                    >
                      <Text fontSize="lg">{el.message}</Text>
                    </Box>
                  </Flex>
                </Box>
              )
            )}
          <div ref={space}></div>
        </Flex>
      </Box>
      <FormControl>
        <Flex
          justify={"center"}
          alignItems="center"
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          width={"100%"}
        >
          <Input
            mb="20px !important"
            w={{ base: "230px", lg: "450px" }}
            position="fixed"
            left={0}
            right={0}
            bottom={0}
            color="red"
            ml={{ base: "0px", lg: "450px" }}
            height="2rem"
            placeholder="write your message here"
            type="text"
            value={messageValue}
            onKeyPress={(e) => handleKeyPress(e)}
            bgColor="lightgrey"
            onChange={(e) => setMessageValue(e.target.value)}
          />
          <Button
            colorScheme="red"
            onClick={requestToMessage}
            position="fixed"
            w={{ base: "140px", lg: "180px" }}
            ml={{ base: "230px", lg: "910px" }}
            fontSize={{ base: "14px", lg: "18px" }}
            left={0}
            right={0}
            bottom={0}
            mb="15px"
            zIndex={2}
          >
            Send your message
          </Button>
        </Flex>
      </FormControl>
    </>
  );
}

export default Chatting;
