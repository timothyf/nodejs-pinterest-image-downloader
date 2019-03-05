'use strict';

describe('downloader-factory', () => {
  it('should return an instance of downloader', () => {
    const downloaderFactory = require('./downloader-factory');

    expect(downloaderFactory).not.toBe(null);
    expect(typeof downloaderFactory).toBe('function');
    expect(downloaderFactory().constructor.name).toBe('Downloader');
  });
});
