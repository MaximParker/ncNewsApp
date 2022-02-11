import React from "react";
import { Helmet } from "react-helmet";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/User";
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

function Article() {
  const { loggedInUsername } = useContext(UserContext);
  const { article_id } = useParams();
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState({});
  const [commentsData, setCommentsData] = useState([]);
  const [isEditingCommentID, setEditingCommentID] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  

  useEffect(() => {
    getArticleByID(article_id)
      .then((result) => {
        setArticleData(result);
      })
      .then(() => {
        return getCommentsByArticleID(article_id);
      })
      .then((result) => {
        setCommentsData(result);
        let commentAuthors = result.map((comment) => {
          return comment.author;
        });
        setUsersData(commentAuthors.filter(unique));
      })
      .then(() => {
        setLoaded(true);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          navigate('/404')
        } else {
          navigate('/500')
        }
      })
  }, [article_id, commentsData, isEditingCommentID]);

  return (
    <>
      <Helmet>
        <title>{articleData.title}</title>
      </Helmet>
      {isLoaded ? (
        <>
          <section className="container">
            <>
              <h1>{articleData.title}</h1>
              <span>
                By <strong>{articleData.author}</strong>,{" "}
                {formatDate(articleData.created_at)}
              </span>
              <div className="card">
                <p>{articleData.body}</p>
              </div>
              <VoteButtons>{articleData}</VoteButtons>
              <Link to={`/articles/${articleData.article_id}#comments`}>
                <button>Comments ({articleData.comment_count})</button>
              </Link>
            </>
          </section>
          {/*       <p className="topics">
        See more about <strong>{articleData.topic}</strong>
      </p> */}
          <section className="container">
            <>
              <h1 id="comments">Comments ({articleData.comment_count})</h1>
              <CommentInput
                article={articleData}
                commentsData={commentsData}
                setCommentsData={setCommentsData}
              />
              <ul>
                {commentsData.map((comment) => {
                  return (
                    <li key={comment.comment_id + comment.created_at}>
                      <Comment
                        comment={comment}
                        article_id={article_id}
                      ></Comment>
                    </li>
                  );
                })}
                <BackToTop />
              </ul>
            </>
          </section>
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
