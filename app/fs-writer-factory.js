'use strict';

module.exports = () => {
  const fs = require('fs');

  return require('fs-writer')(fs);
};
