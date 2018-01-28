"use strict";

/* eslint-disable global-require */

process.on("SIGINT", () => {
  process.exit(0);
});

const electrodeConfippet = require("electrode-confippet");
const support = require("electrode-archetype-react-app/support");

//
const startServer = config => require("./express-server")(config);
//

support.load().then(() => {
  const config = electrodeConfippet.config;
  return startServer(config);
});
