const path = require('path');
const remoteIP = 'http://35.194.132.93:8888';
// const remoteIP = 'http://admin-yw2.7qjf.com/';
// const remoteIP = 'http://10.16.1.39:8080/qqjf_admin/';
// const remoteIP = 'http://admin-dev1.7qjf.com/';

export default {
  entry: 'src/index.js',
  theme: './src/theme.js',
  publicPath: '/',
  // publicPath: '/income/',
  // outputPath: './dist',
  proxy: {
    '/stock': {
      target: remoteIP,
      changeOrigin: true,
      pathRewrite(path) {
        return path;
      },
    },
  },
  extraBabelPlugins: [
    'transform-decorators-legacy',
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
    production: {
      outputPath: './dist/income',
      publicPath: '/income/',
    },
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    assets: path.resolve(__dirname, 'src/assets/'),
    utils: path.resolve(__dirname, 'src/utils/'),
    config: path.resolve(__dirname, 'src/utils/config/'),
    enums: path.resolve(__dirname, 'src/utils/enums/'),
    services: path.resolve(__dirname, 'src/services/'),
    models: path.resolve(__dirname, 'src/models/'),
    routes: path.resolve(__dirname, 'src/routes/'),
    themes: path.resolve(__dirname, 'src/themes/'),
  },
  ignoreMomentLocale: true,
  html: {
    template: './src/index.ejs',
  },
  // disableDynamicImport: true,
  hash: true,
};
