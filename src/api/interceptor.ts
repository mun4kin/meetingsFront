import Axios from 'axios-observable';

const server = 'http://localhost:5000';


/** Interceptors */
const intercept = () => {
  Axios.interceptors.request.use((config: any) => {

    const host = ~window.location.hostname.indexOf('127.0.') ||
    ~window.location.hostname.indexOf('localhost') ? server : 'https://meetings-back-new.herokuapp.com';
    config.url = host + config.url;

    return config;
  });

};

export default intercept;
