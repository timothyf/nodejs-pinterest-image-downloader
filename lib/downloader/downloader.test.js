'use strict';

const fakeFetchFailure = (url) => Promise.reject(`Could not download from ${url}`);
const fakeFetchSuccess = (response) => ({
  fetch: (url) => Promise.resolve(`'${url}' returns '${response}'`)
});

describe('class Downloader', () => {
  describe('fetchContent() - Mock Tests', () => {
    describe('failure cases', () => {
      [
        { input: 'bananas' },
        { input: 'cupcakes' },
        { input: 'chocolate' }
      ].forEach(({ input }) => {
        it(`fetchContent(${input}) should fail`, (done) => {
          const urlValidator = require('valid-url');
          const downloader = require('./downloader')(fakeFetchFailure, urlValidator);

          downloader.fetchContent(input)
            .catch(actual => {
              expect(actual.message).toBe(`Could not download from ${input}`);
              done();
            });
        });
      });
    });

    describe('success cases', () => {
      [
        { input: 'https://something1.com', expected: 'some data1' },
        { input: 'https://something2.com', expected: 'some data2' },
        { input: 'https://something3.com', expected: 'some data3' },
      ].forEach(({ input, expected }) => {
        it(`fetchContent('${input}') returns '${expected}'`, (done) => {
          const urlValidator = require('valid-url');
          const downloader = require('./downloader')(fakeFetchSuccess(expected).fetch, urlValidator);

          downloader.fetchContent(input)
            .then(actual => {
              expect(actual).toBe(`'${input}' returns '${expected}'`);
              done();
            });
        });
      });

    });
  });
});
