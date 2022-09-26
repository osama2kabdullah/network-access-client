import React from "react";
import auth from "../firebase.init";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const hendlGoogleLogin = () => {
    signInWithGoogle();
  };
  
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  if (user) {
    navigate(from, { replace: true });
  }
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
