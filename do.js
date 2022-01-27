import { expandGlob } from "https://deno.land/std@0.122.0/fs/mod.ts";

const processJs = (name) =>
  Deno.readTextFile(`${name}.js`).then((input) => {
    const output = input.replace(
      /\/\/ node\(([\w-]+)\)\n(import [\w\s{},]+ from ")[^"]+"/g,
      '$2$1"',
    );

    const cjsOutput = '"use strict";\n\n' + output
      .replace(/(from "\.\.?\/[^"]+\.)js"/g, '$1cjs"')
      .replace(/import ([\w\s{},]+) from ("[^"]+")/g, "const $1 = require($2)")
      .replace("export default ", "module.exports = ")
      .replaceAll("export const ", "exports.");

    Deno.writeTextFile(`${name}.js`, output);
    Deno.writeTextFile(`${name}.cjs`, cjsOutput);
  });

Deno.readTextFile(".npmignore").then(async (data) => {
  const exclude = data.split("\n").filter((line) => line);
  const files = expandGlob("*.js", { exclude, includeDirs: false });
  for await (const file of files) processJs(file.path.slice(0, -3));
});

Deno.readTextFile("README.md").then((input) => {
  const output = input
    .replace(/(\n#+ Deno.+?)(\n#+ Node.+?)(?=\n#|$)/s, "$2$1");

  Deno.writeTextFile("README.md", output);
});

Deno.readTextFile("package.json").then((input) => {
  const json = JSON.parse(input);
  delete json.scripts;

  const output = `${JSON.stringify(json, null, 2)}\n`;

  Deno.writeTextFile("package.json", output);
});
