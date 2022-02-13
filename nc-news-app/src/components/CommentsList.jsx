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
  const [commentCounter, setCommentCounter] = useState(parseInt(comment_count));
  const [commentsData, setCommentsData] = useState([]);
  const [freshCommentsData, setFreshCommentsData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    getCommentsByArticleID(article_id).then((result) => {
      setCommentsData(result);
    });
  }, [article_id]);

  useEffect(() => {
    setLoaded(false)
    setLoaded(true);
  }, [commentCounter]);

  return (
    <section className="container">
      <Loading isLoaded={isLoaded} />
      <>
        <h1 id="comments">Comments ({commentCounter})</h1>
        <CommentInput>
          {{ setFreshCommentsData, setCommentCounter, setLoaded }}
        </CommentInput>
        <ul>
          {freshCommentsData.map(
            ({ body, comment_id, created_at, author, votes }) => {
              return (
                <li key={comment_id + created_at}>
                  <Comment>
                    {{
                      body,
                      comment_id,
                      created_at,
                      author,
                      votes,
                      setCommentsData: setFreshCommentsData,
                      setCommentCounter,
                    }}
                  </Comment>
                </li>
              );
            }
          )}
          {commentsData.map(
            ({ body, comment_id, created_at, author, votes }) => {
              return (
                <li key={comment_id + created_at}>
                  <Comment>
                    {{
                      body,
                      comment_id,
                      created_at,
                      author,
                      votes,
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
