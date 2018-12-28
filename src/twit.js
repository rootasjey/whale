const Twit    = require('twit');
const config  = require('./config.json');

const _persistentInstance = new Twit(config);

module.exports = {
  persistentInstance() {
    return _persistentInstance;
  } ,
  newInstance() {
    return new Twit(config);
  },
};
