'use strict';

const path = require('path');

const getRssItems = (xml) => xml.channel[0].item;
const getRssItemLinks = (text) => text.match('https://.*.jpg')[0].split('"')[0];

module.exports = async (rssUrl, outputDir) => {
  const fetch = require('node-fetch');
  const urlValidator = require('valid-url');
  const downloader = require('downloader')(fetch, urlValidator);

  const xml2js = require('xml2js').parseString;
  const rssParser = require('rss-parser')(xml2js);

  const fs = require('fs');
  const fsWriter = require('fs-writer')(fs);

  const downloadedXmlDocument = await downloader.fetchContent(rssUrl).then((res) => res.text());
  const parsedRssDocument = await rssParser.parseRss(downloadedXmlDocument);

  const items = getRssItems(parsedRssDocument);
  const imageLinks = items.map(item => getRssItemLinks(item.description[0]));

  const images = imageLinks.map((imageLink) => ({
    filename: path.basename(imageLink),
    url: imageLink
  }));

  const pendingDownloads = images
    .map((image) =>
      downloader
        .fetchContent(image.url)
        .then(res => fsWriter.savePromisedData(res.body, `${outputDir}/${image.filename}`)));

  return await Promise.all(pendingDownloads)
    .then(() => `finished downloading ${items.length} images`);
};
