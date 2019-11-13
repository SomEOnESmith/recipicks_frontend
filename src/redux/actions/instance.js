import axios from "axios";

const instance = axios.create({
  baseURL: "http://167.172.166.150/api/"
});

export default instance;
