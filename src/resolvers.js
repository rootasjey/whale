const Twit = require('twit');

var twitInstance = new Twit({
  consumer_key: 'TeZFNU6eNFIKhFE0T27sHNnL1',
  consumer_secret: 'AhuduS1sVSFx2bfgf8V1s5DgFZe8Z2vRm4104kmbNkQfDk4PWm',
  access_token: '1074693031230619648-lB3zSk5UhuULivCaRnKxBoAlwFeP0o',
  access_token_secret: 'gaiIBqVctfxGhrFUo5KX5wS8tqXhwKyKoj6MreLPT1C5G',
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL: true,     // optional - requires SSL certificates to be valid.
});

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