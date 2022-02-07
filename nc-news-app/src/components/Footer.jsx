import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllTopics } from "../utils/api";

function Footer() {
  return (
    <nav id="footer">
      <ul>
        <li>https://github.com/MaximParker</li>
      </ul>
    </nav>
  );
}

export default Footer;
