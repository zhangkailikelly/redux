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
        config.devtool = false//生产环境不需要，减小打包体积
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

package.json//
{
  "name": "robot-web",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "ant-design-pro": "^2.2.1",
    "axios": "^0.18.0",
    "core-js": "^3.0.1",//来自babel 用于转换es6语法，需在App.js引入
    "echarts": "^4.2.0-rc.2",
    "echarts-for-react": "^2.0.15-beta.0",
    "immutable": "^3.8.2",
    "jquery": "^3.3.1",
    "jsplumb": "^2.8.6",
    "react": "^16.4.2",
    "react-dom": "^16.4.2",
    "react-loadable": "^5.5.0",
    "react-redux": "^5.0.7",
    "react-router-dom": "^4.3.1",
    "react-scripts": "^1.1.5",
    "react-sortable": "^2.0.0",
    "redux": "^4.0.0",
    "redux-thunk": "^2.3.0",
    "uuid": "^3.3.2"
  },
  "scripts": {
    "start": "set MSO_BUILD_ENV=dev&&react-app-rewired start",//设置环境变量
    "build": "react-app-rewired  build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-app-rewired eject"
  },
  "devDependencies": {
    "antd": "^3.9.1",
    "babel-plugin-import": "^1.8.0",
    "babel-plugin-react-transform": "^3.0.0",
    "babel-plugin-transform-decorators": "^6.24.1",//修饰器
    "babel-plugin-transform-decorators-legacy": "^1.3.5",//修饰器
    "node-sass": "^4.10.0",
    "react-app-rewire-less": "^2.1.3",
    "react-app-rewire-scss": "^1.0.2",
    "react-app-rewired": "^1.6.2",
    "react-router": "^4.3.1",
    "react-router-dom": "^4.3.1",
    "react-scripts": "^1.1.5",
    "react-transform-hmr": "^1.0.4",//热重载，用于开发时页面不刷新可更新内容
    "sass-loader": "^7.1.0"
  }
}
