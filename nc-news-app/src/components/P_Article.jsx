import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleByID, capitalise } from "../utils/api";
import Footer from "./Footer";

function Article() {
  const { article_id } = useParams();
  const [articleData, setArticleData] = useState({
    article_id: "",
    author: "",
    body: "",
    comment_count: "",
    created_at: "",
    title: "",
    topic: "",
    votes: "",
  });

  useEffect(() => {
    getArticleByID(article_id).then((result) => {
      setArticleData(result);
    });
  }, [article_id]);

  return (
    <>
      <section id="article">
        <>
          <h2>{articleData.title}</h2>
          <p>
            <strong>{articleData.author}</strong>,{" "}
            {articleData.created_at.substring(0, 10)}
          </p>
          <p id="article__body">{articleData.body}</p>
          <p id="article__category">{capitalise(articleData.topic)}</p>
          <button>⭐ ({articleData.votes})</button>
          <Link to="/">
            <button>Comments ({articleData.comment_count})</button>
          </Link>
        </>
      </section>
      <Footer />
    </>
  );
}

export default Article;
