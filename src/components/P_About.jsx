import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import BackToTop from "./BackToTop";
import Footer from "./Footer";

function About() {
  return (
    <>
      <Helmet>
        <title>About</title>
      </Helmet>
      <h1>About</h1>
      <section className="container">
        <div className="card">
          <p>
            <b>nc-news-app</b> is a{" "}
            <a href="https://reactjs.org/">
              <u>React</u>
            </a>{" "}
            front-end web-app for a messageboard-style forum. It is built on the{" "}
            <a href="https://github.com/MaximParker/forum-factory">
              <u>Forum-Factory</u> API.
            </a>
          </p>
          <br></br>
          <p>
            Written by{" "}
            <a href="github.com/MaximParker">
              <u>MaximParker</u>
            </a>
          </p>
          <p>Latest version 1.0.0 (12 Feb 2022).</p>
        </div>

        <BackToTop />
        <br></br>
        <br></br>
        <h2 id="content-policy">Content Policy</h2>
        <div className="card">
          <p>
            This is a public web-app for portfolio purposes. While great care is
            taken to regularly re-seed the database, no responsibility can be
            taken for the content of any articles or comments. By posting a
            comment or article, users agree to ensure content is respectful and
            inoffensive.
          </p>
          <Link to="/">Home</Link>
        </div>
        <BackToTop />
        <br></br>
      </section>
      <Footer />
    </>
  );
}

export default About;
