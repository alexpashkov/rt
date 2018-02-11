'use strict';

require('./config');
const server = require('./server');
require('./socket')(server);
