import { useState } from "react";
import { sendVotes } from "../utils/api";

const VoteButtons = ({children}) => {
  const {targetType, targetID, votes} = children;
  const [voted, setVoted] = useState(false);
  const [score, setScore] = useState(votes);
  console.log(`${targetType} ${targetID} has a score of ${score} (voted=${voted})`)

  const handleClick = (increment) => {
    console.log(`VOTING ${increment} ON ${targetType} ${targetID}`)
    setVoted(true)
    setScore(score + increment);
    sendVotes(targetType, targetID, increment)
    .catch((err) => {
      console.log(err);
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
