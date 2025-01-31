// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;
console.log(resolver.assetExts);
config.resolver.assetExts.push("ttf");
config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
}
config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext)=>ext!=='svg'),
  sourceExts: [...resolver.sourceExts, 'svg'],
}
module.exports = config;