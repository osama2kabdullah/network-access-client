import React from "react";
import auth from "../firebase.init";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const Login = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const hendlGoogleLogin = () => {
    signInWithGoogle();
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
