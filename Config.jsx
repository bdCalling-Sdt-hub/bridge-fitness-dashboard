import axios from "axios";

//api base url config
const baseAxios = axios.create({
  baseURL: "http://server.unityinmotion.ca",
  headers: { "X-Custom-Header": "foobar" },
});

export default baseAxios;
export const ServerUrl = 'http://server.unityinmotion.ca'

