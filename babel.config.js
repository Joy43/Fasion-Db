// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: [
//       ["babel-preset-expo", { jsxImportSource: "nativewind" }],

//       "nativewind/babel",
//     ],
//     plugins: ["react-native-reanimated/plugin", "react-native-worklets/plugin"],
//   };
// };
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    // Remove the plugins array entirely, or set it to an empty array: plugins: [],
  };
};
