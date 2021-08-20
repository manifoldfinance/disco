# web3-react

Warning: pre-alpha code!

## Getting Started

- `yarn`
- `yarn bootstrap`
- `yarn start`

Then, visit [http://localhost:3000/](http://localhost:3000/).

## Lerna

### Add a dependency

```yarn lerna add zustand --scope example```

### Remove a dependency

Delete the relevant `package.json` entry. Because of a [lerna bug](https://github.com/lerna/lerna/issues/1883), it's not possible to prune `yarn.lock` programmatically, so regenerate it manually.
