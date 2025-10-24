import axios from 'axios';

export const api = axios.create({
  baseURL: "http://178.128.15.229:3000",
});
