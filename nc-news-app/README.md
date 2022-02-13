# nc-news-app

## Introduction

**nc-news-app** is a [React](https://reactjs.org/) front-end web-app for a messageboard-style forum. It is built on the [Forum-Factory API](https://github.com/MaximParker/forum-factory).

> A live version can be accessed here: https://maximparker-nc-news.netlify.app/

Written by [Maxim Parker](github.com/MaximParker). Latest version 1.0.0 (12 Feb 2022).

---
## How to run a local copy
### 1. Install dependencies
```
$ npm i
```
At a minimim, [Node 17.0.1](https://nodejs.org/en/) must be installed.

### 2. Start localhost
```
$ npm start
```
The locally hosted web-app will open in your browser.

---
## Changing API link
Beware that the API link may not be currently available. In order to use your own, change the `baseURL` of the `axios.create` function in `/src/utils/api.js`:
```
const db = axios.create({
  baseURL: /* your URL here */,
});
```

---
## Acknowledgements

This project was completed as part of the front-end module on the [Northcoders](https://northcoders.com/) bootcamp. I couldn't have done this without the intensive 12 weeks of mentoring provided by their hard-working and friendly tutors.

---
Copyright (c) 2022