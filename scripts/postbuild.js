const fs = require("node:fs");
const objs = require(`${__dirname}/../dist/index.js`);

fs.writeFileSync(
    `${__dirname}/../dist/index.mjs`,
    `import * as illustrator from "./index.js";\n\n${Object.keys(objs)
        .map((m) => {
            return `export const ${m} = illustrator["${m}"];`;
        })
        .join("\n")}`
);
