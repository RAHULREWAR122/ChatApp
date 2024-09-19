import React from "react";
import style from "./AllUsers.module.css";
import { useState, useEffect, useContext } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../Firebase/auth";
import { AuthContext } from "../../../Context1/AuthContext";
import { ChatContext } from "../../../Context1/ChatContext";

function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);

  const { currUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleDispatchUser = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  useEffect(() => {
    const getAllChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currUser.uid), (doc) => {
        setAllUsers(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currUser.uid && getAllChats();
  }, [currUser.uid]);


  return (
    <>       
      {allUsers && Object.entries(allUsers)
        ?.sort((a , b)=>b[1].data - a[1].data)
        .map((chat) => (
          <div
            className={style.showUsers}
            key={chat[0]}
            onClick={() => handleDispatchUser(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div>
              <strong>{chat[1].userInfo.displayName}</strong>
              <span>{chat[1].lastMessage?.text}</span>
            </div>
          </div>
        ))}
    </>
  );
}

export default AllUsers;

