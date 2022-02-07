import axios from "axios";

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
      console.log("DATA:", res.data.articles);
      return res.data.articles;
    });
};

export const getArticleByID = (id) => {
  return db
    .get(`/articles/${id}`)
    .then((res) => {
      console.log("DATA:", res.data.article);
      return res.data.article;
    });
};

export const capitalise = (input) => {
  if (input) {
    return input[0].toUpperCase() + input.substring(1);
  }
  return null;
}