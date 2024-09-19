import React from "react";
import style from "./signIn.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../Firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";

function SignIn() {
  const [msg, setMsg] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
          navigate("/home");
          setMsg(false);
        })
        .catch((error) => {
          setMsg(true);
          console.log("1 error" , error.message)
        });
    } catch (err) {
      setMsg(true);
      console.log("2 error" , err.message)
    }
  };

  return (
          <div className={`card ${style.signUp}`}>
            <div className={`card-body ${style.showForm}`}>
              <h2 className="card-title">Time Pass Chat</h2>
              <span>Login now</span>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                {msg && (
                  <span className="text-danger">Something went wrong...</span>
                )}
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
              <div>
                <strong>
                  Haven't you already registered?{" "}
                  <NavLink to="/signUp">Register Now</NavLink>
                </strong>
              </div>
            </div>
          </div>
  );
}

export default SignIn;
