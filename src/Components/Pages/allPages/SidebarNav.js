import React, { useContext } from "react";
import style from "./sidrbarNav.module.css";
import { AuthContext } from "../../../Context1/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../Firebase/auth";
import { useNavigate } from "react-router-dom";

function SidebarNav() {
 
  return (
    <div className={style.sideNav}>
      <div className={style.logo}>
        <span>Time Pass</span>
      </div>
    </div>
  );
}

export default SidebarNav;
