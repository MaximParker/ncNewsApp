import React from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import { capitalise, formatDate } from "../utils/api";
import Footer from "./Footer";
import Loading from "./Loading";

function NewArticle() {
  const { loggedInUsername } = useContext(UserContext);
  const navigate = useNavigate();
  const [inputTitle, setInputTitle] = useState("");
  const [inputBody, setInputBody] = useState("");
  const [isPosting, setPosting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosting(true);

    setTimeout(function () {
      navigate("/");
    }, 5000);
  };

  return (
    <>
      <Helmet>
        <title>{capitalise(inputTitle) || "New Article"}</title>
      </Helmet>
      <>
        {isPosting ? (
          <>
            <h1>Publishing...</h1>
            <Loading />
          </>
        ) : (
          <>
            <h1>Editor</h1>
            <section className="container">
              <>
                <h1>{inputTitle || "New Article"} (preview)</h1>
                <span>
                  By <strong>{loggedInUsername}</strong>,{" "}
                  {formatDate(new Date())}
                </span>
                <div className="card">
                  <p>{inputBody || "Your text will display here"}</p>
                </div>
                <br></br>
              </>
            </section>
            <section className="container">
              <div className="card">
                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <textarea
                    type="text"
                    name="title"
                    placeholder="Title..."
                    onChange={(e) => {
                      setInputTitle(e.target.value);
                    }}
                    value={inputTitle}
                    required
                  />
                  <textarea
                    type="text"
                    name="body"
                    placeholder="Article text..."
                    onChange={(e) => {
                      setInputBody(e.target.value);
                    }}
                    value={inputBody}
                    required
                  />
                  {/* Add required category dropdown, and then the postNewArticle function */}
                  <button type="submit">Submit</button>
                  <span>By clicking 'submit', you agree to our</span>
                  <Link to="/about#content-policy">
                    <span>
                      <strong>Content Policy.</strong>
                    </span>
                  </Link>
                </form>
              </div>
            </section>
          </>
        )}
        <Footer />
      </>
    </>
  );
}

export default NewArticle;
