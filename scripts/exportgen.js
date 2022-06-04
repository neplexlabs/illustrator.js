const fs = require("node:fs");

const prev = fs.readFileSync(`${__dirname}/../src/index.ts`, { encoding: "utf-8" });
const tools = fs.readFileSync(`${__dirname}/../src/toolbox/exports.ts`, { encoding: "utf-8" });
const indexTools = tools.replace(/".\//g, '"./toolbox/');

/**
 * @param {string} input
 */
const removePrevious = (input) => {
    const alertMsg = `\n\n// export tools individually due to docgen issue\n`;
    const removal = input.replace(`${alertMsg}${indexTools}`, "");
    return `${removal}${alertMsg}`;
};

const cleaned = removePrevious(prev);

fs.writeFileSync(`${__dirname}/../src/index.ts`, `${cleaned}${indexTools}`);
