# whale

An open Twitter GraphQL API service.

## Usage

You can directly use the API through the URL provided at the top of this [GitHub page](https://github.com/rootasjey/whale).

* [Search](#search)

### Search

You can search tweets related to terms. All tweets containing these terms will be returned.

```gql
query {
  tweets(pokemon: "charmander") {
    statuses {
      id,
      text
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

## Licence

MIT.
