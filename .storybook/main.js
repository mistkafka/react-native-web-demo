module.exports = {
  "stories": [
    "../src/Pagesstories.mdx",
    "../src/Pages/*.stories.tsx"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: (config) => {
    config.resolve.alias = {
      'react-native': 'react-native-web'
    };
    return config;
  }
}
