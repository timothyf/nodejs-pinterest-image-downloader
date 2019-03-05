'use strict';

describe('index-factory', () => {
  it('should compose an rss downloader', () => {
    const indexFactory = require('./index-factory');

    expect(indexFactory).not.toBe(null);
    expect(typeof indexFactory).toBe('function');
    expect(indexFactory.constructor.name).toBe('AsyncFunction');
  });
});
