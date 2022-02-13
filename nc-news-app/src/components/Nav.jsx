import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/User";

function Nav() {
  const { loggedInUsername } = useContext(UserContext);
  return (
    <nav>
      <Link to="/">
        <img src="../../logo512.png" alt="logo" height="64px"></img>
      </Link>
      <div className="nav__grid">
      <Link to="/new_article">
      <button>New article</button>
      </Link>
      <Link to="/about">
      <button>About</button>
      </Link>
      
      </div>
      <div className="nav__grid">
        <span>{loggedInUsername}</span>
      </div>
      <div className="nav__grid">
        <img
          id="nav__user-icon"
          src="../../user_icon.png"
          alt="logo"
          height="20px"
        ></img>
      </div>
    </nav>
  );
}

export default Nav;
