require("dotenv").config();
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const withSourceMaps = require("@zeit/next-source-maps");

module.exports = withSourceMaps({
  serverRuntimeConfig: {},
  publicRuntimeConfig: {},
  env: {
    SENTRY_DSN: "",
  },
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser";
    }
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }
    return config;
  },
});
