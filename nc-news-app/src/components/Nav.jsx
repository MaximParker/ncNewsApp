import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/User";

function Nav() {
  const { loggedInUsername } = useContext(UserContext);
  return (
    <nav>
      <div classname="nav__grid">
        <Link to="/">
          <img src="../../logo512.png" alt="logo" height="64px"></img>
        </Link>
      </div>
      <div className="nav__grid">
        {/* <input disabled></input> */}
      </div>
      <div className="nav__grid">
        <span>{loggedInUsername}</span>
      </div>
      <div className="nav__grid">
        <img id="nav__user-icon" src="../../user_icon.png" alt="logo" height="20px"></img>
      </div>
    </nav>
  );
}

export default Nav;
