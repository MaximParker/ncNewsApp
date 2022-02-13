import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/User";
import { postComment } from "../utils/api";

const CommentInput = ({ children }) => {
  const { article_id } = useParams();
  const { setFreshCommentsData, setCommentCounter, setLoaded } = children;
  const { loggedInUsername } = useContext(UserContext);
  const [inputText, setinputText] = useState("");
  const [showingPostFeedback, showPostFeedback] = useState(false);

  const handleChange = (input) => {
    setinputText(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoaded(false);
    setinputText("");
    return postComment(article_id, loggedInUsername, inputText).then(
      ({ comment }) => {
        setFreshCommentsData((current) => {
          return [comment, ...current];
        });
        setCommentCounter((current) => current + 1);
        showPostFeedback(true);
        setTimeout(function () {
          showPostFeedback(false);
        }, 5000);
      }
    );
  };

  return (
    <div className="card">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <textarea
          type="text"
          name="comment"
          placeholder="Add comment..."
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          value={inputText}
          required
        />
        <button type="submit">Add comment</button>
        {showingPostFeedback ? (
          <span>✅ Comment posted</span>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default CommentInput;
