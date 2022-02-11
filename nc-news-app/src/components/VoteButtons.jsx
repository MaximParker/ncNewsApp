import { useState } from "react";
import { voteArticle } from "../utils/api";

const VoteButtons = (props) => {
  const {article_id, votes} = props.children;
  const [voted, setVoted] = useState(false);
  const [score, setScore] = useState(votes);

  const handleClick = (id, i) => {
    setVoted(true)
    setScore(score + i);
    voteArticle(id, i).catch(() => {
      setScore(score);
    });
  };

  return (
    <>
      {voted ? (
        <>
        <button
          disabled
        >
          👍
        </button>
        <span>
          <strong>{score}</strong>
        </span>
        <button
          disabled
        >
          👎
        </button>
      </>
      ) : (
        <>
          <button
            onClick={() => {
              handleClick(article_id, 1);
            }}
          >
            👍
          </button>
          <span>
            <strong>{score}</strong>
          </span>
          <button
            onClick={() => {
              handleClick(article_id, -1);
            }}
          >
            👎
          </button>
        </>
      )}
    </>
  );
};

export default VoteButtons;
