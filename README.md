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
  "prepack": "deno run --unstable --allow-read=. --allow-write=. https://raw.githubusercontent.com/valtlai/nodefy/2.0.1/do.js"
},
```

Add a comment before each external import
containing the name of the npm package used to replace the Deno module URL:

```js
// node(NPM_PACKAGE_NAME)
import myModule from "https://deno.land/x/MODULE_NAME@1.0.0/mod.js";
```
