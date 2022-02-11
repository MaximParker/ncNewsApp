import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/User";
import { formatDate, deleteComment } from "../utils/api";

const Comment = (props) => {
  const {
    body,
    comment_id,
    created_at,
    author,
    setCommentsData,
    setCommentCounter,
  } = props.children;
  const { loggedInUsername } = useContext(UserContext);
  const [isDisplayingDeleteBox, setDisplayDeleteBox] = useState(false);
  const [isEditing, setEditingComment] = useState(false);
  const [inputText, setinputText] = useState("");

  useEffect(() => {
    setinputText(body);
  }, [body]);

  const handleChange = (input) => {
    setinputText(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="card">
      <span className="span__small">
        <strong>{author}</strong> {formatDate(created_at)}
      </span>
      {author === loggedInUsername ? (
        <span className="span__small">
          (
          <u
            onClick={() => {
              if (!isEditing) {
                setEditingComment(true);
                setDisplayDeleteBox(false);
              } else {
                setEditingComment(false);
              }
              setDisplayDeleteBox(false);
            }}
          >
            Edit comment
          </u>
          ) (
          <u
            onClick={() => {
              if (!isDisplayingDeleteBox) {
                setEditingComment(false);
                setDisplayDeleteBox(true);
              } else {
                setDisplayDeleteBox(false);
              }
              setEditingComment(false);
            }}
          >
            Delete
          </u>
          )
        </span>
      ) : (
        <></>
      )}
      <p>{body}</p>
      {isDisplayingDeleteBox ? (
        <div className="card">
          <button
            className="button__danger"
            onClick={() => {
              setDisplayDeleteBox(false);
              deleteComment(comment_id);
              setCommentsData((current) => {
                return current.filter(entry => entry.comment_id !== comment_id)
              }).then(() => {
                setCommentCounter((current) => {
                  return current - 1;
                });
              });
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setDisplayDeleteBox(false);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <></>
      )}
      {isEditing ? (
        <div className="card">
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            <textarea
              type="text"
              name="comment"
              placeholder="Edit comment..."
              size="36"
              disabled
              onChange={(event) => {
                handleChange(event.target.value);
              }}
              value={inputText}
              required
            />
            <button type="submit">Confirm edit</button>
            <button
              type="submit"
              onClick={() => {
                setEditingComment(false);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Comment;
