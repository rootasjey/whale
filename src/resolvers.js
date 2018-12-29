const { client }          = require('./twitter');
const { tweetSubFilter }  = require('./subResolvers');

const Twitter = client();

module.exports = {
  Query: {
    version: () => '0.2.0',

    tweets: (root, args) => {
      const {word, count} = args;

      return Twitter.get('search/tweets', { q: `${word} since:2011-07-11`, count: count })
        .then((result) => {
          return result;
        });
    },
  },

  Subscription: {
    tweetAdded: {
      subscribe: tweetSubFilter,
    },
  },
};
