const { client } = require('./twitter');

const Twitter = client();

const { PubSub, withFilter } = require('apollo-server');

const pubsub = new PubSub();

const TWEET_ADDED = 'tweetAdded';

const streamsPool = {
  // [word]: {
  //  clientsCount: number,
  //  stream: twitStream,
  //  onTweet: Function,
  //}
};

module.exports = {
  pubsub,

  tweetSubFilter: withFilter(
    () => pubsub.asyncIterator(TWEET_ADDED),
    (payload, variables) => {
      return payload.word === variables.word;
    }
  ),

  watch(word = '') {
    if (streamsPool[word]) {
      streamsPool[word].clientsCount++;
      return;
    }

    const onTweet = (tweet) => {
      pubsub.publish(TWEET_ADDED, { tweetAdded: tweet, word });
    }

    const stream = Twitter
      .stream('statuses/filter', { track: word })
      .on('data', onTweet)
      .on("error", error => console.error("error", error));

    streamsPool[word] = {
      clientsCount: 1,
      onTweet,
      stream,
    };
  },

  stopWatch(word = '') {
    if (!word) { return; }

    const wave = streamsPool[word];

    if (!wave) { return; }

    wave.clientsCount--;

    if (wave.clientsCount < 1) {
      wave.stream.off('data', wave.onTweet);

      process.nextTick(() => {
        wave.stream.destroy();
        delete streamsPool[word];
      });
    }
  }
}