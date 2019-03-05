'use strict';

describe('class RssParser', () => {
  describe('parseXml()', () => {
    [
      { input: 'pizza' },
      { input: '<item>item2' },
      { input: 'ice cream' }
    ].forEach(({ input }) => {
      it('should fail to parse xml document', (done) => {
        const xmlParser = require('xml2js').parseString;
        const rssParser = require('./rss-parser')(xmlParser);

        rssParser.parseXml(input)
          .catch(actual => {
            expect(actual.message).toBe('Could not parse xml document');
            done();
          });
      });
    });

    [
      { input: '<?xml version="1.0" encoding="utf-8"?><item>item1</item>', expected: { 'item': 'item1' } },
      { input: '<?xml version="1.0" encoding="utf-8"?><item>item2</item>', expected: { 'item': 'item2' } },
      { input: '<?xml version="1.0" encoding="utf-8"?><item>item3</item>', expected: { 'item': 'item3' } }
    ].forEach(({ input, expected }) => {
      it('should be able to parse xml document', (done) => {
        const xmlParser = require('xml2js').parseString;
        const rssParser = require('./rss-parser')(xmlParser);

        rssParser.parseXml(input)
          .then(actual => {
            expect(actual).toEqual(expected);
            done();
          });
      });
    });
  });

  describe('parseRss()', () => {
    [
      { input: '<?xml version="1.0" encoding="utf-8"?><item>item1</item>' },
      { input: '<?xml version="1.0" encoding="utf-8"?><item>item2</item>' },
      { input: '<?xml version="1.0" encoding="utf-8"?><item>item3</item>' }
    ].forEach(({ input }, index) => {
      it(`should fail to parse rss document ${index + 1}`, (done) => {
        const xmlParser = require('xml2js').parseString;
        const rssParser = require('./rss-parser')(xmlParser);

        rssParser.parseRss(input)
          .catch(actual => {
            expect(actual.message).toBe('Not a valid rss document');
            done();
          });
      });
    });

    [
      { input: '<?xml version="1.0" encoding="utf-8"?><rss><item>item1</item></rss>', expected: { item: [ 'item1' ] } },
      { input: '<?xml version="1.0" encoding="utf-8"?><rss><item>item2</item></rss>', expected: { item: [ 'item2' ] } },
      { input: '<?xml version="1.0" encoding="utf-8"?><rss><item>item3</item></rss>', expected: { item: [ 'item3' ] } }
    ].forEach(({ input, expected }, index) => {
      it(`should be able to parse rss document ${index + 1}`, (done) => {
        const xmlParser = require('xml2js').parseString;
        const rssParser = require('./rss-parser')(xmlParser);

        rssParser.parseRss(input)
          .then(result => {
            expect(result).toEqual(expected);
            done();
          });
      });
    });
  });
});
