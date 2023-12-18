import axios from "axios";

const request = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT,
  headers: {
    common: {
      "Content-Type": "application/json",
    }
  }
})

export default request;