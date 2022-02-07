import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllTopics } from "../utils/api";

const links = [{text: "My portfolio", URL: "https://github.com/MaximParker"}]

function Footer() {
  return (
    <nav id="footer">
      <ul>
        {links.map((entry) => {
          return <li key={entry.text}><a href={entry.URL}>{entry.text}</a></li>
        })}
      </ul>
    </nav>
  );
}

export default Footer;
