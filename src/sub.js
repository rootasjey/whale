const { newInstance } = require('./twit');

let twit = newInstance();

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
    console.log(`watch ${word}`);

    if (streamsPool[word]) {
      streamsPool[word].clientsCount++;
      return;
    }

    const onTweet = (tweet) => {
      console.log(`new tweet for ${word}`)
      console.log(tweet);
      pubsub.publish(TWEET_ADDED, { tweetAdded: tweet, word });
    }

    const stream = twit.stream('statuses/filter', { track: [word] });
    stream.on('tweet', onTweet);

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
      wave.stream.off('tweet', wave.onTweet);
      // wave.stream.stop();
      delete streamsPool[word];

      // if (Object.keys(streamsPool).length === 0) {
      //   twit = newInstance();
      // }
    }
  }
}