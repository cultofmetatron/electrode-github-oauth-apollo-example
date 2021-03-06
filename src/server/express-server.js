"use strict";

const Promise = require("bluebird");
const express = require("express");
const app = express();
const path = require("path");
const _ = require("lodash");
const defaultConfig = require("electrode-confippet").config;
const Confippet = require("electrode-confippet");

/*
const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URL);
let session = require('express-session')
*/

if (process.env.ENVIRONMENT !== 'production') {
  require('dotenv').config();  // loads the .env file
}

const serverRoutes = require('./routes/router');

const loadServerRoutes = function() {
  return new Promise((resolve, reject) => {
    app.use(serverRoutes);
    resolve(true);
  });
}

/*
const loadSessions = function() {
  return new Promise((resolve, reject) => {
    app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
    }));
    resolve(true);
  });
}
*/

const loadConfigs = function(userConfig) {
  //use confippet to merge user config and default config
  if (_.get(userConfig, "plugins.electrodeStaticPaths.enable")) {
    userConfig.plugins.electrodeStaticPaths.enable = false;
  }

  return Confippet.util.merge(defaultConfig, userConfig);
};

const setStaticPaths = function() {
  app.use(
    express.static(
      path.join(
        __dirname,
        "../..",
        defaultConfig.$("plugins.electrodeStaticPaths.options.pathPrefix")
      )
    )
  );
};

const setRouteHandler = () =>
  new Promise((resolve, reject) => {
    const webapp = p => (p.startsWith(".") ? path.resolve(p) : p);
    const registerRoutes = require(webapp(defaultConfig.$("plugins.webapp.module"))); //eslint-disable-line

    return registerRoutes(app, defaultConfig.$("plugins.webapp.options"), err => {
      if (err) {
        console.error(err); //eslint-disable-line
        reject(err);
      } else {
        resolve();
      }
    });
  });

const startServer = () =>
  new Promise((resolve, reject) => {
    app.listen(defaultConfig.$("connections.default.port"), err => {
      if (err) {
        reject(err);
      } else {
        //eslint-disable-next-line
        console.log(`App listening on port: ${defaultConfig.$("connections.default.port")}`);
        resolve();
      }
    });
  });

module.exports = function electrodeServer(userConfig, callback) {
  const promise = Promise.resolve(userConfig)
    .then(loadConfigs)
    .then(setStaticPaths)
    .then(loadServerRoutes)
    .then(setRouteHandler)
    .then(startServer);

  return callback ? promise.nodeify(callback) : promise;
};
