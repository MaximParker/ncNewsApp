import React from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/User";
import { getArticleByID, formatDate, patchArticle } from "../utils/api";
import Footer from "./Footer";
import VoteButtons from "./VoteButtons";
import CommentsList from "./CommentsList";

function Article() {
  const { article_id } = useParams();
  const { loggedInUsername } = useContext(UserContext);
  const navigate = useNavigate();
  const [
    { title, author, created_at, body, votes, comment_count, topic },
    setArticleData,
  ] = useState({});
  const [isLoaded, setLoaded] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [inputText, setInputText] = useState("");
  const [showingEditFeedback, showEditFeedback] = useState(false);

  useEffect(() => {
    getArticleByID(article_id)
      .then((result) => {
        setArticleData(result);
        setInputText(result.body);
      })
      .then(() => {
        setLoaded(true);
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          navigate("/404");
        } else {
          navigate("/500");
        }
      });
  }, [article_id, navigate]);

  const handleChange = (input) => {
    setInputText(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
    if (inputText !== body) {
      patchArticle(article_id, inputText);
      setArticleData((current) => {
        return {
          body: inputText,
          title,
          author,
          created_at,
          votes,
          comment_count,
          topic,
        };
      });
      showEditFeedback(true);
      setTimeout(function () {
        showEditFeedback(false);
      }, 5000);
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {isLoaded ? (
        <>
          <section className="container">
            <>
              <h1>{title}</h1>
              <span>
                By <strong>{author}</strong>, {formatDate(created_at)}
              </span>
              <div className="card">
                <p>{body}</p>
              </div>
              <VoteButtons>
                {{ targetType: "article", targetID: article_id, votes }}
              </VoteButtons>
              <Link to={`/articles/${article_id}#comments`}>
                <button>Comments ({comment_count})</button>
              </Link>
              {author === loggedInUsername ? (
                <button
                  onClick={() => {
                    if (isEditing) {
                      setEditing(false);
                    } else {
                      setEditing(true);
                    }
                  }}
                >
                  Edit article
                </button>
              ) : (
                <></>
              )}
              {showingEditFeedback ? <span>✅ Edited</span> : <></>}
              <br></br>
              {isEditing ? (
                <div className="card">
                  <form
                    onSubmit={(event) => {
                      handleSubmit(event);
                    }}
                  >
                    <textarea
                      id="Article__edit-article"
                      type="text"
                      name="edit-article"
                      value={inputText}
                      onChange={(event) => {
                        handleChange(event.target.value);
                      }}
                      required
                    />
                    <button type="submit">Confirm edit</button>
                    <button
                      onClick={() => {
                        setEditing(false);
                      }}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              ) : (
                <></>
              )}
            </>
          </section>
          <p className="topics">
            <Link to={`/t/${topic}`}>
              <strong>More about {topic}</strong>
            </Link>
          </p>
          <CommentsList>{{ comment_count, article_id }}</CommentsList>
          <Footer />
        </>
      ) : (
        <div id="loading">
          <img src="../../LoadingSpinner.png" alt="logo" height="32px"></img>
        </div>
      )}
    </>
  );
}

export default Article;
