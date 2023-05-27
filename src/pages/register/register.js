import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuth } from "../../firebase";
import { message } from 'antd';

function Register() {
  const [messageApi, contextHolder] = message.useMessage();

  const currentUser = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register, setRegister] = useState(false);

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setRegister(true)
        messageApi.open({
            type: 'success',
            content: 'Account registered successfully',
          });
          setTimeout(() => {
            navigate('/');
    }, 1000);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use"){
            messageApi.open({
                type: 'warning',
                content: 'Email already in use',
              });
        }
        else if (error.code === "auth/weak-password"){
            messageApi.open({
                type: 'warning',
                content: 'Weak password',
              });
        }
        else{
            messageApi.open({
                type: 'warning',
                content: 'Unable to register. Please try again later. (probably invalid mail)',
              });
        }

      });
  };

  useEffect(() => {
    if (currentUser && !register) {
        messageApi.open({
            type: 'warning',
            content: 'Already logged in into your account',
          });

    setTimeout(() => {
            navigate('/');
    }, 1000);
    }
  }, [currentUser, navigate]);



  return (
    <>
        {contextHolder}

        <div className="sign-in-container">
          <form onSubmit={signUp}>
            <h1>Create account</h1>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button type="submit">Sign up</button>
          </form>
        </div>

        <div> already have an account click <Link to = "/login">HERE</Link></div>
    </>
  );
}

export default Register;
