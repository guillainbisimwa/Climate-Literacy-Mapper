const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

module.exports = {
  ...config,
  serializer: {
    ...config.serializer,
    isThirdPartyModule: (module) => {
      if (/(^|[/\\])node_modules[/\\]/.test(module.path)) {
        return !module.path.match(/[/\\](expo-router[/\\]entry|expo[/\\]AppEntry)/);
      }
      return false;
    },
  },
};
