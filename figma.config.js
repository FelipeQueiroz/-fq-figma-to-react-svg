require("dotenv").config();const fileId = process.env.FILE_ID;
const outputters = [
require("@figma-export/output-components-as-svg")({ output: "./icons" })
];/** @type {import('@figma-export/types').FigmaExportRC} */
module.exports = {
commands: [
[ "components", {
fileId,
onlyFromPages: ["solid"],
outputters,
},
],
[ "components", {
fileId,
onlyFromPages: ["outline"],
outputters,
},
],
],
};