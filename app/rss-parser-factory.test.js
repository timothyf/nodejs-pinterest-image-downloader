'use strict';

describe('rss-parser-factory', () => {
  it('should return an instance of rss-parser', () => {
    const rssParserFactory = require('./rss-parser-factory');

    expect(rssParserFactory).not.toBe(null);
    expect(typeof rssParserFactory).toBe('function');
    expect(rssParserFactory().constructor.name).toBe('RssParser');
  });
});
