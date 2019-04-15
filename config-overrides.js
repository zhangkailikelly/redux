const fs = require("fs");
const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireSass = require('react-app-rewire-scss');
module.exports = function override(config, env) {
    fs.writeFileSync("./src/env.js", `export default ${process.env.MSO_BUILD_ENV ? `"${process.env.MSO_BUILD_ENV}"` : undefined}`)
    if (env === "development") {
        config = injectBabelPlugin(["react-transform", {
            "transforms": [{
                "transform": "react-transform-hmr",
                "imports": ["react"],
                "locals": ["module"]
            }]
        }], config);

    } else if (env === "production") {
        config.devtool = false
    }
    config = injectBabelPlugin(['import', [{
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: "css"
    }, {libraryName: 'ant-design-pro',//pro配置
        libraryDirectory: 'lib',
        style:"css",
        camel2DashComponentName: false}]], config);
    config = injectBabelPlugin(["syntax-dynamic-import"], config);
    config = injectBabelPlugin(["transform-decorators-legacy"], config);//修饰器配置
    config = rewireSass(config, env);
    // config = rewireLess.withLoaderOptions({
    //     modifyVars: {"@primary-color": "#3ABAB9"},
    //     javascriptEnabled: true,
    // })(config, env);

    return config;
};
