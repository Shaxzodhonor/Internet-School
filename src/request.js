import axios from "axios";

const request = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT,
  headers: {
    common: {
      "Authorization": `Bearer ${JSON.parse(window.sessionStorage.getItem("__login"))}`,
      "Content-Type": "application/json",
    }
  }
})

export default request;