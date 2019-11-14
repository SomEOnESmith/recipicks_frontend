import axios from "axios";

const instance = axios.create({
  baseURL: "http://167.172.166.150/api/"
  // baseURL: "http://127.0.0.1:8000/api/"
});

export default instance;
