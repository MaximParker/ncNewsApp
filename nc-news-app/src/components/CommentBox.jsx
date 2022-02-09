import { useState } from "react";
import { voteArticle } from "../utils/api";

const CommentBox = (props) => {
  const [inputText, setinputText] = useState("");
  const handleInput = (input) => {
    setinputText(input);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
  };

  console.log();

  return (
    <div className="card">
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <input
          type="text"
          name="comment"
          placeholder="Add comment..."
          onChange={(event) => {
            handleInput(event.target.value);
          }}
          required
        />
        <button type="submit">Add comment</button>
      </form>
    </div>
  );
};

export default CommentBox;
