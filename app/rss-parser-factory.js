'use strict';

module.exports = () => {
  const xml2js = require('xml2js').parseString;

  return require('rss-parser')(xml2js);
};
