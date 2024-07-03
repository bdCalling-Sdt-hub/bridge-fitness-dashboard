import axios from "axios";

//api base url config
const baseAxios = axios.create({
  baseURL: "https://server.unityinmotion.ca",
  // baseURL: "http://192.168.10.116:8000",
  headers: { "X-Custom-Header": "foobar" },
});

export default baseAxios;
// export const ServerUrl = 'http://192.168.10.116:8000'
export const ServerUrl = 'http://server.unityinmotion.ca'

