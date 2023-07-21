// src/styles.ts
var commonStyle = "padding: 2px 4px 2px 4px; border-radius:5px; font-weight:600; ";
var modularStyles = [
  `${commonStyle}color: #fff; background: #45C58B`,
  `${commonStyle}color: #fff; background: #0ED6CA`,
  `${commonStyle}color: #fff; background: #7A5AF8`,
  `${commonStyle}color: #fff; background: #53B1FD`,
  `${commonStyle}color: #fff; background: #EF45B3`,
  `${commonStyle}color: #fff; background: #F54343`,
  `${commonStyle}color: #fff; background: #FF5479`,
  `${commonStyle}color: #fff; background: #FD853A`,
  `${commonStyle}color: #fff; background: #00A870`,
  `${commonStyle}color: #fff; background: #E34D59`
];
var buildStyle = (style) => {
  return `padding: ${style.paddingTop}px ${style.paddingRight}px ${style.paddingBottom}px ${style.paddingLeft}px; border-radius: ${style.borderRadius}px; font-weight: ${style.fontWeight}; color: ${style.color}; background: ${style.background}`;
};

// src/index.ts
var KLog = {
  version(title, version) {
    console.log(
      `%c ${title} %c V${version} `,
      "padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060; font-weight: bold;",
      "padding: 2px 5px 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;"
    );
  },
  log(modular, data) {
    console.log(`[${modular}]`, data);
  }
};
var baseConfig = {
  all: true,
  modular: [],
  withBaseStyle: true,
  styles: []
};
var hasKLog = (code) => {
  const match = code.match(/KLog\.log\(['"](\w+)['"], (\w+)\)/);
  return match != null;
};
var realStyles = [];
var modularMap = {};
var getModularStyle = (modular) => {
  if (modularMap.hasOwnProperty(modular)) {
    return realStyles[modularMap[modular]];
  }
  const index = Math.floor(Math.random() * realStyles.length);
  modularMap[modular] = index;
  return realStyles[index];
};
var hasStyle = () => {
  return realStyles.length > 0;
};
var VitePluginKjxingLog = (config = {}) => {
  const realConfig = {
    ...baseConfig,
    ...config
  };
  if (realConfig.styles.length > 0) {
    let tempStyle = [];
    for (const style of realConfig.styles) {
      tempStyle.push(buildStyle(style));
    }
    realStyles.push(...tempStyle);
  }
  if (realConfig.withBaseStyle) {
    realStyles.push(...modularStyles);
  }
  return {
    name: "vite-plugin-kjxing-log",
    enforce: "post",
    transform: (code, id) => {
      let result = "";
      if (!id.includes("node_modules") && hasKLog(code)) {
        const rows = code.split("\n");
        let temp = [];
        for (let row of rows) {
          while (hasKLog(row)) {
            const match = row.match(/KLog\.log\(['"](\w+)['"], (\w+)\)/);
            if (match != null) {
              const modular = match[1];
              let tempStr = "";
              if (realConfig.all || realConfig.modular.includes(modular)) {
                if (hasStyle()) {
                  tempStr = `console.log("%c ${modular} ","${getModularStyle(modular)}", ${match[2]} )`;
                } else {
                  tempStr = `console.log("[${modular}]", ${match[2]} )`;
                }
              }
              row = row.replace(/KLog\.log\(['"](\w+)['"], (\w+)\)/, tempStr);
            }
          }
          temp.push(row);
        }
        result = temp.join("\n");
      } else {
        result = code;
      }
      return result;
    }
  };
};
var src_default = VitePluginKjxingLog;
export {
  KLog,
  src_default as default
};
