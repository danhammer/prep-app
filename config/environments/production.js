const path = require('path');
const express = require('express');
const basicAuth = require('basic-auth');
const favicon = require('serve-favicon');

const indexPath = path.join(process.cwd(), 'dist/index.html');

function auth(username, password) {
  return function authMiddleware(req, res, next) {
    const user = basicAuth(req);
    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    }
    return next();
  };
}

module.exports = (app) => {
  app.use(auth(process.env.USERNAME, process.env.PASSWORD));
  app.use(favicon(`${process.cwd()}/public/favicon.ico`));
  app.use(express.static(path.join(process.cwd(), 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(indexPath);
  });
};
