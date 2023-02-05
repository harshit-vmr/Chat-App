import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/API";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChattContainer from "../components/ChattContainer";

export default function Chat() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);

  const [currentUser, setCurrentUser] = useState(undefined);

  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    async function func() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    }
    func();
  }, []);

  useEffect(() => {
    async function func() {
      if (currentUser) {
        if (currentUser.isAvatarSet) {

          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    func();
  }, [currentUser]);

  const handleChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChange}
        />
        {
          currentChat === undefined?
          <Welcome currentUser={currentUser}/>:
          <ChattContainer currentChat={currentChat}/>
        }
        
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
