# valtlai/nodefy

Converts my Deno modules for Node.js before publishing to npm:
- Replaces imported Deno modules with npm equivalents.
- Creates CJS variants from the ESM files.
- Reorders the Node.js usage instructions in `README.md`
  to precede the Deno ones.
- Removes `scripts` from `package.json`.

It’s used by these repos:
- [postcss-font-format-keywords](https://github.com/valtlai/postcss-font-format-keywords)
- [postcss-color-image](https://github.com/valtlai/postcss-color-image)
- [markdown-it-ib](https://github.com/valtlai/markdown-it-ib)

## Usage

Add this in `package.json`:

```json
"scripts": {
  "prepack": "deno run --unstable --allow-read=. --allow-write=. .build.js"
},
```

Create a `.build.js` file with the following:

```js
import build from "https://raw.githubusercontent.com/valtlai/nodefy/1.0.0/mod.js";

build([
  "https://deno.land/x/MODULE_NAME@1.0.0/mod.js",
  "NPM_PACKAGE_NAME",
]);
```

The function takes one or more arrays as arguments.
Each array consists of two values,
where the first one is the URL of a Deno module to be replaced
with the second value, the name of a npm package.
