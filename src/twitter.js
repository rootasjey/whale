const config  = require('./config.json');

const Twitter = require('twitter-lite');
const client = new Twitter(config);

module.exports = {
  client() { return client; }
};
