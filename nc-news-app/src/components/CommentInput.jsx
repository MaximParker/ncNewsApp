import { useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import { postComment } from "../utils/api";

const CommentInput = (props) => {
  const { loggedInUsername } = useContext(UserContext);
  const [inputText, setinputText] = useState("");

  const handleChange = (input) => {
    setinputText(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setinputText("");
    return postComment(
      props.article.article_id,
      loggedInUsername,
      inputText
    ).then((result) => {
      props.setCommentsData([result, ...props.commentsData]);
    });
  };

  return (
    <div className="card">
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <img
          id="nav__user-icon"
          src="../../user_icon.png"
          alt="logo"
          height="30px"
        ></img>
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
