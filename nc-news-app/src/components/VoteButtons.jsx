import { useState } from "react";
import { voteArticle } from "../utils/api";

const VoteButtons = (props) => {
  const [Score, setScore] = useState(props.children.votes);
  const handleClick = (id, i) => {
    setScore(Score + i);
    voteArticle(id, i).catch(() => {
      setScore(Score);
    });
  };

  return (
    <>
      <button
        onClick={() => {
          handleClick(props.children.article_id, 1);
        }}
      >
        👍
      </button>
      <span>
        <strong>{Score}</strong>
      </span>
      <button
        onClick={() => {
          handleClick(props.children.article_id, -1);
        }}
      >
        👎
      </button>
    </>
  );
};

export default VoteButtons;
