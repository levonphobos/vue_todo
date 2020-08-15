const path = require('path');

const config = {
  BASE_PATH: path.resolve(__dirname, './'),
  COMPONENT_PATH: path.resolve(__dirname, './../components'),
  HOC_PATH: path.resolve(__dirname, './../hoc'),
  HELPER_PATH: path.resolve(__dirname, './../helpers'),
  SERVICE_PATH: path.resolve(__dirname, './../services'),
  PAGE_PATH: path.resolve(__dirname, './../pages'),
};

export default config;
