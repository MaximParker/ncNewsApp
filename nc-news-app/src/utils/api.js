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

export const getArticlesByTopic = (topic="*", sort_by, order) => {
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
    return res.data.comments.sort(compare);
  });
};

export const voteArticle = (id, i) => {
  let patchObject = { inc_votes: i };
  return db.patch(`/articles/${id}?patch=votes`, patchObject).then((res) => {
    return res.data.article.votes;
  });
};

export const postComment = (article_id, username, body) => {
  let postObject = { username, body };

  return db
    .post(`/articles/${article_id}/comments`, postObject)
    .then((res) => {
      return res.data;
    })
};

export const deleteComment = (comment_id) => {
  return db.delete(`/comments/${comment_id}`)
}

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

export const unique = (value, index, self) => {
  return self.indexOf(value) === index;
};

export const compare = (a, b) => {
  if (a.created_at > b.created_at) {
    return -1;
  }
  if (a.created_at < b.created_at) {
    return 1;
  }
  if (a.created_at === b.created_at && a.comment_id > b.comment_id) {
    return -1;
  }
  return 0;
};
