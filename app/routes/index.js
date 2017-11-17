const resume = require('./resume');

module.exports = function(app, db) {
  resume(app, db);
};
