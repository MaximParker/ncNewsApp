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
      <section className="articles__card">
        <>
          <h1>{articleData.title}</h1>
          <span>
            <strong>{articleData.author}</strong>
          </span>
          <span>{formatDate(articleData.created_at)}</span>
          <div className="articles__card">
            <p>{articleData.body}</p>
          </div>
          {isLoaded ? (
            <VoteButtons>{articleData}</VoteButtons>
          ) : (
            <>
              <button>👍</button>
              <span>
                <strong>--</strong>
              </span>
              <button>👎</button>
            </>
          )}

          <Link to={`/articles/${articleData.article_id}#comments`}>
            <button>Comments ({articleData.comment_count})</button>
          </Link>
        </>
      </section>
      <p className="TopicsCard">
        See more about <strong>{articleData.topic}</strong>
      </p>
      <section className="Container">
        <>
          <h1 id="comments">Comments ({articleData.comment_count})</h1>
          <ul>
            {commentsData.map((comment) => {
              return (
                <li key={comment.comment_id} className="articles__card">
                  <strong>{comment.author}</strong>
                  <p>{comment.body}</p>
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
