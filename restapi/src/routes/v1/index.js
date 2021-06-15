const express = require('express');
const docsRoute = require('./docs.route');
const wordsRoute = require('./words.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/words',
    route: wordsRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
