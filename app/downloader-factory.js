'use strict';

module.exports = () => {
  const fetch = require('node-fetch');
  const urlValidator = require('valid-url');

  return require('downloader')(fetch, urlValidator);
};
