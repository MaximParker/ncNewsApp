import { Link } from "react-router-dom";

function Footer() {
  return (
    <section id="footer">
      <Link to="/">
        <img src="../../logo512.png" alt="logo" height="64px"></img>
      </Link>
      <ul>
        <li>nc-news-app</li>
        <li>by MaximParker</li>
        <li><a href="https://github.com/MaximParker">GitHub</a></li>
        <li><a href="https://www.flaticon.com/">Logo by flaticon.com</a></li>
      </ul>
      
      
    </section>
  );
}

export default Footer;
