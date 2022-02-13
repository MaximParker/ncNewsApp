import React from "react";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  capitalise,
  formatDate,
  getAllTopics,
  getArticlesByTopic,
} from "../utils/api";
import BackToTop from "./BackToTop";
import Footer from "./Footer";
import VoteButtons from "./VoteButtons";
import Loading from "./Loading";

function Topicpage() {
  const navigate = useNavigate();
  let { topic } = useParams();
  if (!topic) {
    topic = "";
  }
  const [isLoaded, setLoaded] = useState(false);
  const [topicsList, setTopicsList] = useState([]);
  const [articlesList, setArticlesList] = useState([]);

  const [sortBy, setSortBy] = useState("created_at");
  const [orderBy, setOrderBy] = useState("desc");

  useEffect(() => {
    getAllTopics()
      .then((result) => {
        setTopicsList(result);
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          navigate("/404");
        } else {
          navigate("/500");
        }
      });
  }, [navigate]);

  useEffect(() => {
    setLoaded(false);
    getArticlesByTopic(topic, sortBy, orderBy)
      .then((result) => {
        setArticlesList(result);
      })
      .then(() => {
        setLoaded(true);
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          navigate("/404");
        } else {
          navigate("/500");
        }
      });
  }, [topic, sortBy, orderBy, navigate]);

  return (
    <>
      <Helmet>
        <title>NCN {topic}</title>
      </Helmet>
      <Loading isLoaded={isLoaded} />
      <>
        <section className="topics">
          <ul>
            <li key={0}>
              <button onClick={(event) => navigate(`/t`)}>Everything</button>
            </li>
            {topicsList.map(({ slug }) => {
              return (
                <li key={slug}>
                  <button onClick={(event) => navigate(`/t/${slug}`)}>
                    {slug}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
        <section id="sort-options">
          <h1>{topic}</h1>
          <label htmlFor="select-sort-by">By </label>
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
        </section>
        <section className="container">
          <ul>
            {articlesList.map(
              ({
                article_id,
                title,
                author,
                topic,
                created_at,
                comment_count,
                votes,
              }) => {
                return (
                  <li key={article_id} className="card">
                    <>
                      <span className="span__small">
                        <strong>{capitalise(topic)}</strong>{" "}
                        {formatDate(created_at)}
                      </span>
                      <Link to={`/articles/${article_id}`}>
                        <h2>{title}</h2>
                      </Link>
                      <VoteButtons>
                        {{ targetType: "article", targetID: article_id, votes }}
                      </VoteButtons>
                      <Link to={`/articles/${article_id}#comments`}>
                        <button>Comments ({comment_count})</button>
                      </Link>
                      <span>
                        <strong>{author}</strong>
                      </span>
                    </>
                  </li>
                );
              }
            )}
            <BackToTop />
          </ul>
        </section>
        <Footer />
      </>
    </>
  );
}

export default Topicpage;
