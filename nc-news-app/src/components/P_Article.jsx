import React from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {
  getArticleByID,
  getCommentsByArticleID,
  formatDate,
  unique,
} from "../utils/api";
import BackToTop from "./BackToTop";
import Footer from "./Footer";
import VoteButtons from "./VoteButtons";
import CommentInput from "./CommentInput";
import Comment from "./Comment";
import CommentsList from "./CommentsList";

function Article() {
  const { article_id } = useParams();
  const navigate = useNavigate();
  const [
    { title, author, created_at, body, votes, comment_count, topic },
    setArticleData,
  ] = useState({});
  const [commentsData, setCommentsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log("LOADING PAGE!");
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
              <VoteButtons votes={votes} article_id={article_id}></VoteButtons>
              <Link to={`/articles/${article_id}#comments`}>
                <button>Comments ({comment_count})</button>
              </Link>
            </>
          </section>
          <p className="topics">
            See more about <strong>{topic}</strong>
          </p>
          <CommentsList comment_count={comment_count} article_id={article_id} />
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
