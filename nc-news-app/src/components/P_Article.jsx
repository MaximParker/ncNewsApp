import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getArticleByID,
  getCommentsByArticleID,
  formatDate,
} from "../utils/api";
import BackToTop from "./BackToTop";
import Footer from "./Footer";
import VoteButtons from "./VoteButtons";

function Article() {
  const { article_id } = useParams();
  const [articleData, setArticleData] = useState({});
  const [commentsData, setCommentsData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

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
      })
      .then(() => {
        setLoaded(true);
      });
  }, [article_id]);

  return (
    <>
      <section className="card">
        {isLoaded ? (
          <>
            <h1>{articleData.title}</h1>
            <span>
              By <strong>{articleData.author}</strong>, {formatDate(articleData.created_at)}
            </span>
            <div className="card">
              <p>{articleData.body}</p>
            </div>
            <VoteButtons>{articleData}</VoteButtons>
            <Link to={`/articles/${articleData.article_id}#comments`}>
              <button>Comments ({articleData.comment_count})</button>
            </Link>
          </>
        ) : (
          <img src="../../LoadingSpinner.png" alt="logo" height="32px"></img>
        )}
      </section>
{/*       <p className="topics">
        See more about <strong>{articleData.topic}</strong>
      </p> */}
      <section className="container">
        <>
          <h1 id="comments">Comments ({articleData.comment_count})</h1>
          <ul>
            {commentsData.map((comment) => {
              return (
                <li key={comment.comment_id} className="card">
                  <strong>{comment.author}</strong>
                  <p>{comment.body}</p>
                </li>
              );
            })}
            <BackToTop />
          </ul>
        </>
      </section>
      <Footer />
    </>
  );
}

export default Article;
