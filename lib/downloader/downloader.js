'use strict';

class Downloader {
  constructor(fetch, urlValidator) {
    this.fetch = fetch;
    this.urlValidator = urlValidator;
  }

  fetchContent(url) {
    const error = new Error(`Could not download from ${url}`);

    if (this.urlValidator.isUri(url)) {
      return this.fetch(url)
        .catch(() => {
          throw error;
        });
    } else {
      return Promise.reject(error);
    }
  }
}

module.exports = (fetch, urlValidator) =>
  new Downloader(fetch, urlValidator);
