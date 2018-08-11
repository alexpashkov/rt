'use strict';

const winston = require('winston');

const tsFormat = () => new Date().toLocaleTimeString();
const logger = new winston.Logger({
  transports: [
    // colorize the output to the console
    process.env.NODE_ENV !== 'test' &&
      new winston.transports.Console({
        timestamp: tsFormat,
        colorize: true
      })
  ].filter(Boolean)
});

logger.level = 'debug';

module.exports = logger;
