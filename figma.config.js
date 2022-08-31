require("dotenv").config();
const svgo = require('@figma-export/transform-svg-with-svgo')


const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const fileId = process.env.FILE_ID;
const outputters = [
    require("@figma-export/output-components-as-svg")({ output: "./" }),
    require("@figma-export/output-components-as-svgr")({
        getFileExtension: () => ".tsx",
        getComponentName: ({ componentName, pageName }) =>
          componentName + capitalize(pageName),
        getSvgrConfig: () => ({ typescript: true, exportType: "default"  }),
        output: "./src",
        getExportTemplate: ({ componentName, pageName }) => {
            return `export { default as ${componentName + capitalize(pageName)} } from './${componentName + capitalize(pageName)}';`;
        },
      }),
];

/** @type {import('svgo').PluginConfig[]} */
const solidSVGOConfig = [
  { removeDimensions: true },
  { sortAttrs: true },
  { removeAttrs: { attrs: "fill" } },
  { addAttributesToSVGElement: { attribute: { fill: "currentColor" } } },
];


/** @type {import('@figma-export/types').FigmaExportRC} */
module.exports = {
  commands: [
    ["components", {
        fileId,
        onlyFromPages: ["solid"],
        transformers: [svgo({ multipass: true, plugins: [{name: 'preset-default', solidSVGOConfig}] })],
        outputters,
      },
    ],
  ],
};