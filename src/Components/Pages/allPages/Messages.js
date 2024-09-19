import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./message.module.css";
import { ChatContext } from "../../../Context1/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../Firebase/auth";
import { AuthContext } from "../../../Context1/AuthContext";
import "./personal.css";

function Messages({ message }) {
  const { currUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [message]);

  const formatMessageDate = (timestamp) => {
    const milliseconds =
      timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);

    // Create Date object from milliseconds
    const date = new Date(milliseconds);

    // Format the date
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Asia/Kolkata",
    };

    return date.toLocaleString("en-US", options);
  };

  return (
    <div
      className={`messages ${message.senderId === currUser.uid && "owner"}`}
      ref={ref}
    >
      <div className="messagesInfo">
        <img
          src={
            message.senderId === currUser.uid
              ? currUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{formatMessageDate(message.data)}</span>
      </div>
      <div className={style.messagesContent}>
        <p>{message.text}</p>

        {message.img && <img src={message.img} alt="No Image" />}
      </div>
    </div>
  );
}

export default Messages;
