import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuth } from "../../firebase";
import { message } from 'antd';

function Login() {

    const [messageApi, contextHolder] = message.useMessage();

    const currentUser = useAuth();
    const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, setLogin] = useState(false);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setLogin(true)
        messageApi.open({
            type: 'success',
            content: 'Logged in successfully',
          });
          setTimeout(() => {
            navigate('/');
    }, 1000);
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/invalid-email" || error.code === "auth/user-not-found"){
            messageApi.open({
                type: 'warning',
                content: 'Email not found',
              });
        }
        else if (error.code === "auth/wrong-password"){
            messageApi.open({
                type: 'warning',
                content: 'Wrong password',
              });
        }
        else if (error.code === "auth/missing-password"){
            messageApi.open({
                type: 'warning',
                content: 'Please enter the password',
              });
        }
        else{
            messageApi.open({
                type: 'warning',
                content: 'Unable to login. Please try again later.',
              });
        }
      });
  };

useEffect(() => {
    if (currentUser && !login) {
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
          <form onSubmit={signIn}>
            <h1>Log In to your Account</h1>
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
            <button type="submit">Log In</button>
          </form>
        </div>

        <div> need an account? click <Link to = "/register">HERE</Link></div>
    </>
  );
}

export default Login;
