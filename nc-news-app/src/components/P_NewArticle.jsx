import React from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import { formatDate } from "../utils/api";
import Footer from "./Footer";

function NewArticle() {
  const { loggedInUsername } = useContext(UserContext);
  const navigate = useNavigate();
  const [inputTitle, setInputTitle] = useState("New article");
  const [inputBody, setInputBody] = useState("Your text will display here.");
  const [isPosting, setPosting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosting(true);
    setTimeout(function () {
      navigate('/');
    }, 5000);
  };

  return (
    <>
      <Helmet>
        <title>{inputTitle}</title>
      </Helmet>
      <>
        {isPosting ? (
          <></>
        ) : (
          <>
            <h1>New article</h1>
            <section className="container">
              <>
                <h1>{inputTitle} (preview)</h1>
                <span>
                  By <strong>{loggedInUsername}</strong>,{" "}
                  {formatDate(new Date())}
                </span>
                <div className="card">
                  <p>{inputBody}</p>
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
                  <input
                    type="text"
                    name="title"
                    placeholder="Add comment..."
                    onChange={(e) => {
                      setInputTitle(e.target.value);
                    }}
                    value={inputTitle}
                    required
                  />
                  <textarea
                    type="text"
                    name="body"
                    placeholder="Add comment..."
                    onChange={(e) => {
                      setInputBody(e.target.value);
                    }}
                    value={inputBody}
                    required
                  />
                  <button type="submit">Add comment</button>
                </form>
              </div>
            </section>
          </>
        )}

        <p className="topics">
          <Link to={`/`}>
            <strong>More about "topic"</strong>
          </Link>
        </p>
        <Footer />
      </>
    </>
  );
}

export default NewArticle;
