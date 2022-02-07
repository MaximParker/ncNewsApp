import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { capitalise, getAllTopics, getArticlesByTopic } from "../utils/api";

function Homepage() {
  const [topicsList, setTopicsList] = useState([]);
  const [articlesList, setArticlesList] = useState([]);

  const [currentTopic, setCurrentTopic] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [orderBy, setOrderBy] = useState("desc");

  useEffect(() => {
    getAllTopics().then((result) => {
      setTopicsList(result);
    });
  }, []);

  useEffect(() => {
    getArticlesByTopic(currentTopic, sortBy, orderBy).then((result) => {
      setArticlesList(result);
    });
  }, [currentTopic, sortBy, orderBy]);

  return (
    <>
      <section id="topics-container">
        <ul>
          <li key={0} onClick={(event) => setCurrentTopic("")}>
            Any
          </li>
          {topicsList.map((topic) => {
            return (
              <li
                key={topic.slug}
                onClick={(event) => setCurrentTopic(topic.slug)}
              >
                {topic.slug}
              </li>
            );
          })}
        </ul>
      </section>
      <section id="articles-list">
        {currentTopic === "" ? <h1>All posts</h1> : <h1>{currentTopic}</h1>}
        <label htmlFor="select-sort-by">Sort by </label>
        <select
          name="select-sort-by"
          id="select-sort-by"
          defaultValue={"created_at"}
          onChange={(event) => {
            setSortBy(event.target.value);
          }}
        >
          <option key="date" value={"created_at"}>
            Date posted
          </option>
          <option key="title" value="title">
            Post title
          </option>
          <option key="author" value="author">
            Name of author
          </option>
          <option key="votes" value={"votes"}>
            Popularity
          </option>
          <option key="comment_count" value={"comment_count"}>
            Number of comments
          </option>
        </select>
        <select
          name="select-order-by"
          id="select-order-by"
          defaultValue={"desc"}
          onChange={(event) => {
            setOrderBy(event.target.value);
          }}
        >
          <option key="ascending" value="asc">
            Ascending
          </option>
          <option key="descending" value="desc">
            Descending
          </option>
        </select>
        <ul>
          {articlesList.map((article) => {
            return (
              <li key={article.article_id} className="articles__card">
                <>
                  <Link to={`/articles/${article.article_id}`}>
                    <h2>{article.title}</h2>
                  </Link>
                  <h3>{article.author}</h3>
                  <p>
                    {capitalise(article.topic)},{" "}
                    {article.created_at.substring(0, 10)}
                  </p>
                  <button>⭐ ({article.votes})</button>
                  <Link to="/">
                    <button>Comments ({article.comment_count})</button>
                  </Link>
                </>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default Homepage;
