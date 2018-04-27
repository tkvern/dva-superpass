'use strict';

const mock = {}
require('fs').readdirSync(require('path').join(__dirname + '/mock')).forEach(function (file) {
  Object.assign(mock, require('./mock/' + file))
})
// module.exports = mock

// module.exports = mock;
console.log(mock)
export default {
  ...mock,
  'GET /api/users/create': (req, res) => { res.end('OK'); },
};
