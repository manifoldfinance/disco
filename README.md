# web3-react

Warning: pre-alpha code!

## Getting Started

- `yarn`
- `yarn bootstrap`
- `yarn start`

In addition to compiling each package in watch mode, this will also spin up an example app on [http://localhost:3000/](http://localhost:3000/).

## Useful Commands

### Add a dependency

- `yarn lerna add <DEPENDENCY> --scope <SUBPACKAGE>`

### Remove a dependency

- Delete the relevant `package.json` entry

Because of a [lerna bug](https://github.com/lerna/lerna/issues/1883), it's not possible to prune `yarn.lock` programmatically, so regenerate it manually:

- `rm -f packages/<SUBPACKAGE>/yarn.lock`
- `yarn clean --scope SUBPACKAGE`
- `yarn bootstrap`
