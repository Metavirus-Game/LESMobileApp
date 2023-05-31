module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      "@babel/plugin-transform-flow-strip-types",
      // "@babel/plugin-proposal-class-properties",
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      ["@babel/plugin-proposal-private-methods", { loose: true }],
      // ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
    ],
  };
};
