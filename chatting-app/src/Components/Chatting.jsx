import React, { useEffect, useRef, useState } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


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
  
function Chatting() {
    const space = useRef();
    const [messageValue,setMessageValue] = useState("");
    const [data,setData] = useState([]);
    const handleData = async()=>{
      let res = await fetch(`http://localhost:3000/chatting`);
      res = await res.json();
      setData(res);
    }
    useEffect(()=>{
      handleData();

    },[data])
   
    const requestToMessage = async (e)=>{
      e.preventDefault();
      let {photoURL} = auth.currentUser
      let data1 = {
        message:messageValue,
        photoURL: photoURL
      };
      let res = await fetch(`http://localhost:3000/chatting`,{
        method: "POST",
        body: JSON.stringify(data1),
        headers: {
          "Content-Type": "application/json",
        },
      });
      res = await res.json();
      console.log(res);
      handleData();
      setMessageValue('');

    }
    const handleMessage = (id,currentPhotoURL)=>{
      let {photoURL} = auth.currentUser
      if(photoURL===currentPhotoURL){
        
        const new_message = prompt("New Message");
        setTimeout(function () {
          handleEdit(new_message, id);
        }, 2000);
      }
      else{
        alert("You don't have access to this message")
      }
    }
    const handleEdit = async(message,id)=>{
      const data = {
        message: message
      }
      let res = await fetch(`http://localhost:3000/chatting/${id}`,{
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        }
      })
      res = await res.json()
      console.log(res);
      handleData();
  
    }
    const handleDelete = async(id,currentPhotoURL)=>{
      let {photoURL} = auth.currentUser;
      if(photoURL===currentPhotoURL){
        
        let res = await fetch(`http://localhost:3000/chatting/${id}`,{
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        })
        res = res.json;
        console.log(res);
        handleData();
      }
      else{
        alert("You don't have access to this message")
      }

    }
  return (
    <div>
      <h1>Umang's Chatting App</h1>
      <button onClick={()=>auth.signOut()}>Sign Out</button>
      {data.chattingapps && data.chattingapps.map((el,i) => (
      <div key={i} className={`message`}>
        <img src={el.photoURL} alt="" />
        <h1>{i}</h1>
        <p>{el.message}</p>
        <button onClick={()=>handleMessage(el._id,el.photoURL)}>Edit Your Message</button>
        <button onClick={()=>handleDelete(el._id,el.photoURL)}>Delete For Everyone </button>
    </div>))}
      <div ref={space}></div>
      <form>
        <input type="text" value={messageValue} onChange={(e)=>setMessageValue(e.target.value)}/>
        <button className='button-24' onClick={requestToMessage}>Send your message</button>
      
      </form>
    </div>
  )
}

export default Chatting
