# whale

An open Twitter GraphQL API service.

## Quickstart

You can directly use the API through the URL provided at the top of this [GitHub page](https://github.com/rootasjey/whale).

## Rate limits

If you use the available free service from this repo, you should know that there're [rate limits](https://developer.twitter.com/en/docs/basics/rate-limits) enforced by Twitter.

The provided online service should only be used for light experiments.

If you plan to make hundreds of API calls, you should:

* Create a [Twitter account](https://twitter.com/)
* Apply for [a developer account](https://dev.twitter.com/)
* And create an [app](https://developer.twitter.com/en/apps).

## Purpose

As I was developping a react frontend app experiment, I didn't find a quick way to search for tweets containing specific keywords.

The [Twitter official documentation](https://developer.twitter.com) doesn't say how to fetch data from a frontend app.

I decided to build a server for my personal use and for others if you find it useful.

You can either use the available URL at the top if this page or deploy your own server on any cloud service.

> Note that the API usage is restricted by [Twitter usage limitations](https://developer.twitter.com/en/docs/basics/rate-limits).

## Features

* Query
  * [Search](#search)

* Subscription
  * [Streaming Tweet](#streaming-tweet)

### Query

Use queries to request data.

#### Search

You can search tweets related to terms. All tweets containing these terms will be returned.

Request:

```gql

query {
  tweets(word: "charmander") {
    statuses {
      id,
      text
    }
  }
}

```

Response:

```json

{
  "data": {
    "tweets": {
      "statuses": [
        {
          "id": "1075105202905083900",
          "text": "I caught a shiny charmander in Pokémon go! Eeep! I wuvs him!💕 https://t.co/XHhSFZGi6V"
        },
        {
          "id": "1075102908146958300",
          "text": "Owwww Baby Hae and his friend Charmander. So cute uwu https://t.co/gJ0LiaL1Q3"
        }
      ]
    }
  }
}

```

### Subscription

Use subscriptions to receive data through websockets.

#### Streaming Tweet

You can subscribe to a tweets streaming for a particular word.

Request:

```gql

subscription {
  tweetAdded(word: "nasa") {
    created_at
    text
  }
}

```

```json

{
  "data": {
    "tweetAdded": {
      "created_at": "Fri Dec 28 21:00:46 +0000 2018",
      "text": "RT @SPACEdotcom: NASA's New Horizons Ready for Historic Flyby of Ultima Thule in the Kuiper Belt https://t.co/p6jga9qdnc https://t.co/mxduX…"
    }
  }
}

```

## Development

>NOTE: All `yarn` command can be performed with `npm`.

### Pre-requisites

* [node](https://nodejs.org)
* [git](https://git-scm.com)
* [yarn](https://yarnpkg.com)

### Steps

* Clone this repo with `git clone https://github.com/rootasjey/whale.git`
* Go to the local cloned repo: `cd whale`
* Install packages: `yarn`
* Run development server: `yarn run start`

If you want the server to automatically restart on files change, use `yarn run dev`.

## Third party lib

This project uses:

* [Twit](https://github.com/ttezel/twit) to request Twitter API from node.js
* [Apollo server](https://apollographql.com)  to create a GraphQL server
* [GraphQL](https://graphql.github.io) module

## Licence

MIT.
