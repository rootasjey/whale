const { persistentInstance }  = require('./twit');
const { tweetSubFilter }      = require('./sub');

const twit = persistentInstance();

module.exports = {
  Query: {
    version: () => '0.2.0',

    tweets: (root, args) => {
      const {word, count} = args;

      return twit.get('search/tweets', { q: `${word} since:2011-07-11`, count: count })
        .then((result) => {
          return result.data;
        });
    },
  },

  Subscription: {
    tweetAdded: {
      subscribe: tweetSubFilter,
    },
  },
};
