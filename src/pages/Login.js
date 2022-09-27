import React from "react";
import auth from "../firebase.init";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  if (user && localStorage.getItem('accessToken')) {
    navigate(from, { replace: true });
  }
  const hendlGoogleLogin = async () => {
    await signInWithGoogle();
    const {data} = await axios.post('https://sleepy-brushlands-75204.herokuapp.com/login', {email: user?.email});
    localStorage.setItem('accessToken', data?.accessToken)
  };
  
  return (
    <div
      style={{
        height: "45vh",
        width: "35em",
        backgroundColor: "#ddd",
        margin: "auto",
        marginTop: "5vh",
      }}
    >
      <button onClick={hendlGoogleLogin} className="btn btn-primary">
        Login with Google
      </button>
    </div>
  );
};

export default Login;
