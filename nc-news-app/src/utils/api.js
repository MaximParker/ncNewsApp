import axios from "axios";
const dayjs = require('dayjs')

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
      params: { topic, sort_by, order }
    })
    .then((res) => {
      console.log("getArticlesByTopic:", res.data.articles);
      return res.data.articles;
    });
};

export const getArticleByID = (id) => {
  return db
    .get(`/articles/${id}`)
    .then((res) => {
      console.log("getArticleByID:", res.data.article);
      return res.data.article;
    });
};

export const getCommentsByArticleID = (id) => {
  return db
    .get(`/articles/${id}/comments`)
    .then((res) => {
      console.log("getCommentsByArticleID:", res.data.comments);
      return res.data.comments;
    });
};

export const capitalise = (input) => {
  if (input) {
    return input[0].toUpperCase() + input.substring(1);
  }
  return null;
}

export const formatDate = (input) => {
  if (input) {
    return dayjs(input).$d.toString().substring(4,15)
  }
}