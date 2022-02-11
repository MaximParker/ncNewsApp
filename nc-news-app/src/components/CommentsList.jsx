import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByArticleID } from "../utils/api";
import React from "react";
import BackToTop from "./BackToTop";
import CommentInput from "./CommentInput";
import Comment from "./Comment";
import Loading from "./Loading";

const CommentsList = (props) => {
  const { article_id } = useParams();
  const { comment_count } = props.children;
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
      <Loading isLoaded={isLoaded} />
      <>
        <h1 id="comments">Comments ({comment_count})</h1>
        <CommentInput>
          {{ setCommentsData, setCommentCounter }}
        </CommentInput>
        <ul>
          {commentsData.map(
            ({body, comment_id, created_at, author}) => {
              return (
                <li key={comment_id + created_at}>
                  <Comment>
                    {{
                      body,
                      comment_id,
                      created_at,
                      author,
                      setCommentsData,
                      setCommentCounter,
                    }}
                  </Comment>
                </li>
              );
            }
          )}
          <BackToTop />
        </ul>
      </>
    </section>
  );
};

export default CommentsList;
