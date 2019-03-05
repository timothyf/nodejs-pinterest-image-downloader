'use strict';

const env = require('dotenv').config();

if (env.error) {
  throw new Error('Invalid environment configuration');
}

const appConfig = env.parsed;

async function start(config) {
  const { URL, OUTPUT_DIR } = config;
  const pinterestRssFeedImageDownloader = require('./index-factory')(URL, OUTPUT_DIR);

  await pinterestRssFeedImageDownloader
    .then(console.info)
    .catch(err => {
      console.error(err);
    });
}

start(appConfig);
