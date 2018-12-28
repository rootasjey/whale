const { ApolloServer } = require('apollo-server');

const resolvers = require('./src/resolvers');
const typeDefs  = require('./src/types');

const { watch, stopWatch } = require('./src/sub');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect(connectionParams, websocket, context) {
      const { word } = connectionParams;

      if (!word) {
        throw new Error('No "word" header provided. Please add a header key-value pair (e.g. "word": "pikachu")');
      }

      watch(word);

      return {
        createdAt: Date.now(),
        word,
      };
    },
    async onDisconnect(websocket, context) {
      const params = await context.initPromise;
      const { word } = params;

      stopWatch(word);
    }
  }
});

server.listen()
  .then(({ url, subscriptionsUrl }) => {
    console.log(`🚀 Server ready at ${url}`);
    console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
  });
