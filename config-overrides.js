module.exports = {
  resolve: {
    alias: {
      'react-native$': 'react-native-web'
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
          // publicPath: 'https://cdn.example.com/', // uncomment to override webpack public path
          // esModule: true
          scalings: { '@2x': 2, '@3x': 3 },
        },
        loader: 'react-native-web-image-loader',
      },
    ]
  }
};
