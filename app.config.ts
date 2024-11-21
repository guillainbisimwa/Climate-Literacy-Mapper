import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const envConfig: ExpoConfig = {
    ...config,
    slug: "climate-literacy-mapper" ?? '',
    name: "Climate-Literacy-Mapper" ?? '',
    // version:"",
    // android.versionCode:"",

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
      url: `https://u.expo.dev/db290c8a-0c01-4ffa-a70c-509d956d479f`,
    },
    extra: {
      ...config.extra,
      eas: { projectId:"db290c8a-0c01-4ffa-a70c-509d956d479f" },
      ENV: "development",
      API_URL: "https://example.com",
    },
  };
  return envConfig;
};
