import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/User";
import { postComment } from "../utils/api";

const CommentInput = (props) => {
  const { article_id } = useParams();
  const { setCommentsData, setCommentCounter } = props.children;
  const { loggedInUsername } = useContext(UserContext);
  const [inputText, setinputText] = useState("");

  const handleChange = (input) => {
    setinputText(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setinputText("");
    return postComment(article_id, loggedInUsername, inputText).then(
      (result) => {
        setCommentsData((current) => {
          return [result, ...current];
        });
        setCommentCounter((current) => {
          return current + 1;
        });
      }
    );
  };

  return (
    <div className="card">
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <textarea
          type="text"
          name="comment"
          placeholder="Add comment..."
          onChange={(event) => {
            handleChange(event.target.value);
          }}
          value={inputText}
          required
        />
        <button type="submit">Add comment</button>
      </form>
    </div>
  );
};

export default CommentInput;
