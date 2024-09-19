import React, { useContext } from "react";
import style from "./chatNav.module.css";
import { ChatContext } from "../../../Context1/ChatContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context1/AuthContext";
import { auth } from "../../../Firebase/auth";
import { signOut } from "firebase/auth";

function ChatsNav() {

  const { data } = useContext(ChatContext);
  const { currUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = (e)=>{
    e.preventDefault();
    signOut(auth);
    navigate("/");
  }  
   
  return (
    <div className={style.chatsNav}>
      <div className={style.userName}>
        <h3>{data.user?.displayName || "User"}</h3>
      </div>
    
      <div className={style.userCalling}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/3913/3913243.png"
          alt=""
        />
        <img
          src="https://cdn-icons-png.flaticon.com/128/9840/9840098.png"
          alt=""
        />
        <img
          src="https://cdn-icons-png.flaticon.com/128/512/512142.png"
          alt=""
        />
      </div>
      <div className={style.userInfo}>
        <img src={currUser.photoURL} alt={currUser.photoURL} />
        <h3>{currUser.displayName}</h3>
        <button onClick={handleLogOut}>LogOut</button>
      </div>
    
    </div>
  );
}

export default ChatsNav;
