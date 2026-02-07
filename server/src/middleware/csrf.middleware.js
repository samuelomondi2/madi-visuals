const csrf = require('csurf');

const csrfProtection = csrf({
  cookie: false, // uses session
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
});

module.exports = csrfProtection;
