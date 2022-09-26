import React from "react";
import { Link } from "react-router-dom";
import auth from "../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const signoutBtn = () => {
    signOut(auth).then(() => {
      console.log("sign out successfully");
    });
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between px-5">
      <div className="d-flex">
        <Link class="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav d-flex gap-3 mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <Link to="/">Home</Link>
            </li>
            <li class="nav-item active">
              <Link to="/selectedTopic">Selected Topics</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        {user ? (
          <>
          {user.displayName}
          <button onClick={signoutBtn} className="btn btn-primary">
            Logout
          </button>
          </>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
