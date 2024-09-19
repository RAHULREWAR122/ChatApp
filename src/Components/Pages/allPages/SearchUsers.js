import React, { useContext, useEffect, useState } from "react";
import style from "./AllUsers.module.css";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../../Firebase/auth";
import { AuthContext } from "../../../Context1/AuthContext";
import AllUsers from "./AllUsers";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

function SearchUser() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");
  
  const {currUser} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut(auth);
    navigate("/");
  };
  

  const handleSearchUser = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        console.log(doc.data());
      });
    } catch (err) {
      console.log("user not found");
    }
  };

  const handleKey = (e) => {
    // if (e.code === "Enter") {
      handleSearchUser();
    // }
  };

  const handleSelectUser = async () => {
    const combineUsers =
      currUser.uid > user.uid
        ? currUser.uid + user.uid
        : user.uid + currUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combineUsers));
      // if chats not found b/w 2 users then create
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combineUsers), {
          message: [],
        });
        // create users chats
        await updateDoc(doc(db, "userChats", currUser.uid), {
          [combineUsers + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineUsers + ".data"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combineUsers + ".userInfo"]: {
            uid: currUser.uid,
            displayName: currUser.displayName,
            photoURL: currUser.photoURL,
          },
          [combineUsers + ".data"]: serverTimestamp(),
        });
      }

      setUser(null);
      setUserName("");
    } catch (err) {}
  };

  return (
    <div className={style.AllUsers}>
      <div className={style.searchbar}>
        <input
          type="text"
          onKeyDown={handleKey}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Search your friends"
        />
      </div>
      {err}
      <div className={style.users}>
        {user && (
          <div className={style.showUsers} onClick={handleSelectUser}>
            <img src={user.photoURL} alt="" />
            <div>
              <strong>{user.displayName}k</strong>
              <span>Hellow</span>
            </div>
          </div>
        )}
      </div>
     <AllUsers/> 
  
      <div className={style.userInfo}>
        <img src={currUser.photoURL} alt={currUser.photoURL} />
        <span>{currUser.displayName}</span>
        <button onClick={handleSignOut}>LogOut</button>
      </div>
    </div>
  
  );
}

export default SearchUser;
