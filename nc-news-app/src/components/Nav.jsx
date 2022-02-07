import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Nav() {
  return (
    <nav>
      <Link to="/">
        <img src="../../logo192.png" alt="logo" height="50px"></img>
      </Link>

      <ul></ul>
    </nav>
  );
}

export default Nav;
