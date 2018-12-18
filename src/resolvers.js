const Twit = require('twit');
const config = require('./config.json');

var twitInstance = new Twit(config);

module.exports = {
  Query: {
    version: () => '0.1.0',

    tweets: (root, args) => {
      const {pokemon, count} = args;

      return twitInstance.get('search/tweets', { q: `${pokemon} since:2011-07-11`, count: count })
        .then((result) => {
          return result.data;
        });
    }
  },
};