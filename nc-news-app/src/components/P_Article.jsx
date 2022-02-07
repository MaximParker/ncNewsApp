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
      <section className="articles__card">
        <>
          <h1>{articleData.title}</h1>
          <p>
            <strong>{articleData.author}</strong>,{" "}
            {formatDate(articleData.created_at)}
          </p>
          <p>{articleData.body}</p>
          <button>⭐ ({articleData.votes})</button>
        </>
      </section>
      <p className="TopicsCard">
        See more about <strong>{articleData.topic}</strong>
      </p>
      <section className="Container">
        <>
          <h3>Comments ({articleData.comment_count})</h3>
          <ul>
            {commentsData.map((comment) => {
              return (
                <li key={comment.comment_id} className="articles__card">
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
