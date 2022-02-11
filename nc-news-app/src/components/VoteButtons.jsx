import { useState } from "react";
import { voteArticle } from "../utils/api";

const VoteButtons = ({ votes, article_id }) => {
  const [voted, setVoted] = useState(false);
  const [Score, setScore] = useState(votes);
  const handleClick = (id, i) => {
    setVoted(true)
    setScore(Score + i);
    voteArticle(id, i).catch(() => {
      setScore(Score);
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
          <strong>{Score}</strong>
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
            <strong>{Score}</strong>
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
