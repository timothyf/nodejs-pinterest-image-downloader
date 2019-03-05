'use strict';

class RssParser {
  constructor(xmlParser) {
    this.xmlParser = xmlParser;
  }

  parseXml(text) {
    const invalidXmlError = new Error('Could not parse xml document');

    return new Promise((resolve, reject) => {
      this.xmlParser(text, (err, result) => {
        if (err) reject(invalidXmlError);
        else resolve(result);
      });
    });
  }

  parseRss(text) {
    const invalidRssError = new Error('Not a valid rss document');

    return this.parseXml(text)
      .then(result => {
        const rss = result.rss;

        if (!rss) throw 'Could not find rss property';
        else return rss;
      })
      .catch(() => {
        throw invalidRssError;
      });
  }
}

module.exports = (xmlParser) => new RssParser(xmlParser);
