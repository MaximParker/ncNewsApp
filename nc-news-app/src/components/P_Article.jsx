import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getArticleByID,
  getCommentsByArticleID,
  capitalise,
  formatDate,
} from "../utils/api";
import BackToTop from "./BackToTop";
import Footer from "./Footer";

function Article() {
  const { article_id } = useParams();
  const [articleData, setArticleData] = useState({
    article_id: "",
    author: "",
    body: "",
    comment_count: "",
    created_at: "",
    title: "",
    topic: "",
    votes: "",
  });
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    getArticleByID(article_id)
      .then((result) => {
        setArticleData(result);
      })
      .then(() => {
        return getCommentsByArticleID(1);
      })
      .then((result) => {
        setCommentsData(result);
      });
  }, [article_id]);

  return (
    <>
      <section id="Article">
        <>
          <h2>{articleData.title}</h2>
          <p>
            <strong>{articleData.author}</strong>,{" "}
            {formatDate(articleData.created_at)}
          </p>
          <p id="Article__body">{articleData.body}</p>
          <button>⭐ ({articleData.votes})</button>
        </>
      </section>
      <p id="Article__category">See more about {articleData.topic}</p>
      <section id="Comments-container">
        <>
          <h3>Comments ({articleData.comment_count})</h3>
          <ul>
            {commentsData.map((comment) => {
              return (
                <li key={comment.comment_id} className="Comment">
                  <strong>{comment.author}</strong>
                  <p>{comment.body}</p>
                  <button>⭐ ({comment.votes})</button>
                </li>
              );
            })}
          </ul>
        </>
      </section>
      <BackToTop />
      <Footer />
    </>
  );
}

export default Article;
