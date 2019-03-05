'use strict';

describe('pinterest-image-downloader-factory', () => {
  it('should compose an pinterest downloader', () => {
    const pinterestDownloaderFactory = require('./pinterest-image-downloader-factory');

    expect(pinterestDownloaderFactory).not.toBe(null);
    expect(typeof pinterestDownloaderFactory).toBe('function');
    expect(pinterestDownloaderFactory.constructor.name).toBe('AsyncFunction');
  });
});
