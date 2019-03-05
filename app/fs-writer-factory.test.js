'use strict';

describe('fs-writer-factory', () => {
  it('should return an instance of fs-writer', () => {
    const fsWriterFactory = require('./fs-writer-factory');

    expect(fsWriterFactory).not.toBe(null);
    expect(typeof fsWriterFactory).toBe('function');
    expect(fsWriterFactory().constructor.name).toBe('FileWriter');
  });
});
