import axios from "axios";
const dayjs = require("dayjs");

const db = axios.create({
  baseURL: "https://forum-factory.herokuapp.com/api",
});

export const getAllTopics = () => {
  return db.get(`/topics`).then((res) => {
    return res.data.topics;
  });
};

export const getArticlesByTopic = (topic, sort_by, order) => {
  return db
    .get(`/articles`, {
      params: { topic, sort_by, order },
    })
    .then((res) => {
      return res.data.articles;
    });
};

export const getArticleByID = (id) => {
  return db.get(`/articles/${id}`).then((res) => {
    return res.data.article;
  });
};

export const getCommentsByArticleID = (id) => {
  return db.get(`/articles/${id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const voteArticle = (id, i) => {
  let patchObject = { inc_votes: 1 };
  return db.patch(`/articles/${id}?patch=votes`, patchObject).then((res) => {
    console.log("voteArticle: #"+ id, "new score:", res.data.article.votes);
    return res.data.article.votes;
  });
};

export const capitalise = (input) => {
  if (input) {
    return input[0].toUpperCase() + input.substring(1);
  }
  return null;
};

export const formatDate = (input) => {
  if (input) {
    return dayjs(input).$d.toString().substring(4, 15);
  }
};
