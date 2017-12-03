const resume = require('./resume');
const blog = require('./blog');

module.exports = function(app, db) {
  resume(app, db);
  blog(app, db);
};
