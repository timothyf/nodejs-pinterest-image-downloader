'use strict';

class FileWriter {
  constructor(fs) {
    this.fs = fs;
  }

  savePromisedData(data, fileOutputPath) {
    const error = new Error(`Could not save to ${fileOutputPath}`);

    return new Promise((resolve, reject) => {
      const fileWriter = this.fs.createWriteStream(fileOutputPath);
      data.pipe(fileWriter);

      fileWriter.on('finish', () => {
        resolve();
      });

      fileWriter.on('error', () => {
        reject(error);
      });
    });
  }
}

module.exports = (fs) => new FileWriter(fs);
