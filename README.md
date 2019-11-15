# neptunus

Make your GPX files match trails easily.

## Installing

Using npm:

```bash
$ npm install neptunus
```

Using yarn:

```bash
$ yarn add neptunus
```

## Example

### Import the module

You could import the module using import syntax.

```js
import * as neptunus from 'neptunus'
```

Or using require syntax.

```js
const neptunus = require('neptunus')
```

### Creating an instance

You have to create a new instance of neptunus with a [mapbox](https://account.mapbox.com/access-tokens) access token.

```js
const instance = neptunus.create({ mapboxAccessToken: 'YOUR_MAPBOX_TOKEN_HERE' })
```

### neptunus.match(path)

Then, open a GPX file and pass it to neptunus as a string.

```js
const file = readFileSync('./env/thabor.gpx', 'utf-8')
const output = await instance.match(file.toString())
```

## Promises

neptunus depends on a native ES6 Promise implementation to be [supported](http://caniuse.com/promises).
If your environment doesn't support ES6 Promises, you can [polyfill](https://github.com/jakearchibald/es6-promise).

## TypeScript
neptunus includes [TypeScript](http://typescriptlang.org) definitions.

## License

[MIT](LICENSE)