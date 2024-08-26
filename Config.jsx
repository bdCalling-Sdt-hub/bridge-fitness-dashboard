import axios from "axios";

//api base url config
const baseAxios = axios.create({
  baseURL: "https://server.unityinmotion.ca",
  // baseURL: "http://192.168.10.236:6001",
  headers: { "X-Custom-Header": "foobar" },
});

export default baseAxios;
// export const ServerUrl = 'http://192.168.10.236:6001'
export const ServerUrl = 'http://server.unityinmotion.ca'

