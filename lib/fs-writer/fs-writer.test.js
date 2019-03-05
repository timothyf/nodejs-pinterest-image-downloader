'use strict';

const fs = require('fs');
const EventEmitter = require('events');

class FileWriteStreamMock extends EventEmitter {
  constructor() {
    super();
    this.dataCollector = [];
  }

  write(data) {
    this.on('data', (data) => this.dataCollector += data);
    this.emit('data', data);
  }

  end() {
    this.emit('finish');
  }

  createWriteStream() {
    return this;
  }

  getCount() {
    function notEmpty(row) {
      return row.length > 0;
    }

    const result = this.dataCollector
      .split('\n')
      .filter(notEmpty);

    return result.length;
  }
}

describe('class FileWriter', () => {
  describe('savePromisedData()', () => {
    it('should be able to retrieve promised data', (done) => {
      const fileWriteStreamMock = new FileWriteStreamMock();
      const fileStream = fs.createReadStream('./lib/fs-writer/resources/sample-document.txt', 'utf8');
      const fileWriter = require('./fs-writer')(fileWriteStreamMock);

      const promisedSave = fileWriter.savePromisedData(fileStream, '/tmp/test');

      promisedSave.then(() => {
        expect(fileWriteStreamMock.getCount()).toBe(3);
        done();
      }).catch(err => {
        console.error(err);
        done();
      });
    });
  });
});
