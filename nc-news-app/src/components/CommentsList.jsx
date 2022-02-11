import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/User";
import { getCommentsByArticleID } from "../utils/api";
import React from "react";
import BackToTop from "./BackToTop";
import CommentInput from "./CommentInput";
import Comment from "./Comment";

const CommentsList = ({ article_id, comment_count }) => {
  const [commentCounter, setCommentCounter] = useState(comment_count);
  const [commentsData, setCommentsData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    getCommentsByArticleID(article_id)
      .then((result) => {
        setCommentsData(result);
      })
      .then(() => {
        setLoaded(true);
      });
  }, [commentCounter]);

  return (
    <section className="container">
      {isLoaded ? (
        <>
          <h1 id="comments">Comments ({comment_count})</h1>
          <CommentInput
            article_id={article_id}
            setCommentsData={setCommentsData}
            setCommentCounter={setCommentCounter}
          />
          <ul>
            {commentsData.map(({ comment_id, created_at, body, author }) => {
              return (
                <li key={comment_id + created_at}>
                  <Comment
                    body={body}
                    comment_id={comment_id}
                    created_at={created_at}
                    author={author}
                    article_id={article_id}
                    setCommentsData={setCommentsData}
                    setCommentCounter={setCommentCounter}
                  ></Comment>
                </li>
              );
            })}
            <BackToTop />
          </ul>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default CommentsList;
