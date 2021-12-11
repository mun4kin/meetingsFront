import Axios from 'axios-observable';

const server = 'http://localhost:5000';
const onRequest = (config: any) => {
  if (config.headers.hasOwnProperty('NOINTERCEPT')) {
    return config;
  }


  config.headers.common['Access-Control-Allow-Origin'] = '*';

  const host = ~window.location.hostname.indexOf('127.0.') ||
  ~window.location.hostname.indexOf('localhost') ? server : '/';
  config.url = host + config.url;

  return config;
};


/** Interceptors */
const intercept = () => {
  Axios.interceptors.request.use(onRequest);

};

export default intercept;
