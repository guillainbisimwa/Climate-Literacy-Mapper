import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const envConfig: ExpoConfig = {
    ...config,
    slug: "climate-literacy-mapper" ?? '',
    name: "Climate-Literacy-Mapper" ?? '',
    ios: {
      ...config.ios,
      bundleIdentifier: "com.laobowa.mbura",
      buildNumber: '1',
    },
    android: {
      ...config.android,
      package: "com.laobowa.mbura",
      versionCode: 1,
    },
    updates: {
      url: `https://u.expo.dev/23cb8246-3c86-4f0b-ae08-6d6ff30f355d`,
    },
    extra: {
      ...config.extra,
      eas: { projectId:"23cb8246-3c86-4f0b-ae08-6d6ff30f355d" },
      ENV: "development",
      API_URL: "https://example.com",
    },
  };
  return envConfig;
};
