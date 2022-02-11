import React from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getArticleByID,
  formatDate,
} from "../utils/api";
import Footer from "./Footer";
import VoteButtons from "./VoteButtons";
import CommentsList from "./CommentsList";

function Article() {
  const { article_id } = useParams();
  const navigate = useNavigate();
  const [
    { title, author, created_at, body, votes, comment_count, topic },
    setArticleData,
  ] = useState({});
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    getArticleByID(article_id)
      .then((result) => {
        setArticleData(result);
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
  }, [article_id]);

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
              <VoteButtons>{{ article_id, votes }}</VoteButtons>
              <Link to={`/articles/${article_id}#comments`}>
                <button>Comments ({comment_count})</button>
              </Link>
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
