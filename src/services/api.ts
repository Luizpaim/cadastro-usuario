import axios from "axios";

const api = axios.create({
  baseURL: "https://a57d38yzad.execute-api.us-east-1.amazonaws.com",
});

export default api;
