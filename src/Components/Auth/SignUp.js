import React, { useState } from "react";
import style from "./signUp.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../../Firebase/auth";


import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase/auth";
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



function SignUp() {
  const [msg, setMsg] = useState(false);
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    console.log("hello")

    try{
      const resp = await createUserWithEmailAndPassword(auth, email, password); // Corrected line
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
     

      uploadTask.on("state_changed",
      (snapshot) => {
        // Progress tracking logic here
      }, 
      (error) => {
       }, 
       () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            
             await updateProfile(resp.user ,{
                 displayName :displayName,
                 photoURL :downloadURL,
             })
             try{
               await setDoc(doc(db , "users" ,resp.user.uid),{
                   uid : resp.user.uid,
                   displayName,
                   email,
                   photoURL :downloadURL,
               })
             }catch(err){
              setMsg(true)
            }

            await setDoc(doc(db ,"userChats" ,resp.user.uid),{});
          });
       });
       navigate("/");

   }catch(err){
      setMsg(true)
   }};
  

  return (
          <div className={`card ${style.signUp}`}>
            <div className={`card-body ${style.showForm}`}>
              <h2 className="card-title">Time Pass Chat</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <input
                  style={{ display: "none" }}
                  type="file"
                  name=""
                  id="file"
                />
                <label htmlFor="file" className="form-group">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                    alt="user"
                  />
                  <span>Upload Image</span>
                </label>
                {msg && <span className="text-danger">Something went wrong...</span>}
                <button type="submit" className="btn btn-primary">Register</button>
              </form>
              <div>
                <strong>
                  Have you already logged in? <NavLink to="/">Login</NavLink>
                </strong>
              </div>
            </div>
          </div>
       
  );
}

export default SignUp;
