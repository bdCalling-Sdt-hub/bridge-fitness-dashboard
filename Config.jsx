import axios from "axios";

//api base url config
const baseAxios = axios.create({
  baseURL: "https://server.unityinmotion.ca",
  // baseURL: "http://103.161.9.133:5010",
  headers: { "X-Custom-Header": "foobar" },
});

export default baseAxios;
// export const ServerUrl = 'http://103.161.9.133:5010'
export const ServerUrl = 'http://server.unityinmotion.ca'
