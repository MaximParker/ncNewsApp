import { useState } from "react";
import { patchVotes } from "../utils/api";

const VoteButtons = ({children}) => {
  const {targetType, targetID, votes} = children;
  const [voted, setVoted] = useState(false);
  const [score, setScore] = useState(votes);

  const handleClick = (increment) => {
    setVoted(true)
    setScore(score + increment);
    patchVotes(targetType, targetID, increment)
    .catch(() => {
      setScore(score);
    });
  }

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
              handleClick(1);
            }}
          >
            👍
          </button>
          <span>
            <strong>{score}</strong>
          </span>
          <button
            onClick={() => {
              handleClick(-1);
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
